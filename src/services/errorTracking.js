const ERROR_ENDPOINT = process.env.REACT_APP_ERROR_TRACKING_URL || '/api/errors';

export const trackError = async (error, context) => {
  try {
    const errorData = {
      message: error.message,
      stack: error.stack,
      type: error.name,
      context: context,
      environment: process.env.NODE_ENV
    };

    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', errorData);
      return;
    }

    await fetch(ERROR_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorData)
    });
  } catch (trackingError) {
    console.error('Error tracking failed:', trackingError);
  }
};