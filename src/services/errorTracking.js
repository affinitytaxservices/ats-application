const ERROR_ENDPOINT = process.env.REACT_APP_ERROR_TRACKING_URL || '/api/errors';

class ErrorTracking {
  constructor() {
    this.errors = [];
    this.maxErrors = 1000;
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  logError(source, error, context = {}) {
    const errorEntry = {
      id: this.generateErrorId(),
      timestamp: new Date().toISOString(),
      source,
      message: error.message || error,
      stack: error.stack,
      context,
      severity: this.determineSeverity(error),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown'
    };

    this.errors.push(errorEntry);
    
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    if (!this.isProduction) {
      console.error(`[${source}]`, error, context);
    }

    this.persistError(errorEntry);

    if (this.isProduction) {
      this.sendToExternalService(errorEntry);
    }

    return errorEntry.id;
  }

  generateErrorId() {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  determineSeverity(error) {
    if (error.name === 'TypeError' || error.name === 'ReferenceError') {
      return 'high';
    }
    if (error.name === 'NetworkError' || error.message?.includes('fetch')) {
      return 'medium';
    }
    return 'low';
  }

  persistError(errorEntry) {
    try {
      const existingErrors = JSON.parse(localStorage.getItem('app_errors') || '[]');
      existingErrors.push(errorEntry);
      const recentErrors = existingErrors.slice(-100);
      localStorage.setItem('app_errors', JSON.stringify(recentErrors));
    } catch (e) {
      console.warn('Failed to persist error to localStorage:', e);
    }
  }

  async sendToExternalService(errorEntry) {
    try {
      await fetch(ERROR_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorEntry)
      });
    } catch (err) {
      console.warn('Failed to send error to external service:', err);
    }
  }

  getErrors(limit = 50) {
    return this.errors.slice(-limit).reverse();
  }

  clearErrors() {
    this.errors = [];
    try {
      localStorage.removeItem('app_errors');
    } catch (e) {
      console.warn('Failed to clear errors from localStorage:', e);
    }
  }

  getStats() {
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);
    const oneDayAgo = now - (24 * 60 * 60 * 1000);

    const recentErrors = this.errors.filter(error => 
      new Date(error.timestamp).getTime() > oneHourAgo
    );
    
    const dailyErrors = this.errors.filter(error => 
      new Date(error.timestamp).getTime() > oneDayAgo
    );

    return {
      total: this.errors.length,
      lastHour: recentErrors.length,
      lastDay: dailyErrors.length,
      mostRecentError: this.errors.length > 0 ? this.errors[this.errors.length - 1] : null
    };
  }

  logInfo(source, message, context = {}) {
    if (!this.isProduction) {
      console.info(`[${source}]`, message, context);
    }
  }

  logWarning(source, message, context = {}) {
    if (!this.isProduction) {
      console.warn(`[${source}]`, message, context);
    }
  }
}

const errorTracking = new ErrorTracking();

// Legacy function for backward compatibility
export const trackError = async (error, context) => {
  return errorTracking.logError('LegacyTracker', error, context);
};

export default errorTracking;
export { ErrorTracking };