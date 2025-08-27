 // Mock data for Affinity Tax Services application
// This file provides fallback data when API calls fail

// Mock dashboard statistics for admin
export const adminDashboardStats = {
  totalUsers: 156,
  pendingTasks: 23,
  completedTasks: 78,
  activeClients: 112,
  systemAlerts: 3,
  revenue: 45750
};

// Mock system health data
export const systemHealth = [
  { name: 'Database', status: 'healthy', lastChecked: '2023-07-24T10:15:30Z' },
  { name: 'API Server', status: 'healthy', lastChecked: '2023-07-24T10:15:30Z' },
  { name: 'File Storage', status: 'healthy', lastChecked: '2023-07-24T10:15:30Z' },
  { name: 'Email Service', status: 'warning', lastChecked: '2023-07-24T10:15:30Z', message: 'High latency detected' },
  { name: 'Payment Gateway', status: 'healthy', lastChecked: '2023-07-24T10:15:30Z' }
];

// Mock revenue analytics data
export const revenueAnalytics = [
  { month: 'Jan', revenue: 3200 },
  { month: 'Feb', revenue: 3800 },
  { month: 'Mar', revenue: 4200 },
  { month: 'Apr', revenue: 3900 },
  { month: 'May', revenue: 4100 },
  { month: 'Jun', revenue: 4500 },
  { month: 'Jul', revenue: 4800 },
  { month: 'Aug', revenue: 5100 },
  { month: 'Sep', revenue: 4700 },
  { month: 'Oct', revenue: 4300 },
  { month: 'Nov', revenue: 3900 },
  { month: 'Dec', revenue: 3250 }
];

// Mock task analytics data
export const taskAnalytics = {
  statusDistribution: [
    { name: 'Pending', value: 23 },
    { name: 'In Progress', value: 15 },
    { name: 'Completed', value: 78 }
  ],
  priorityDistribution: [
    { name: 'Low', value: 12 },
    { name: 'Medium', value: 45 },
    { name: 'High', value: 59 }
  ]
};

// Mock user activity data
export const userActivity = [
  { date: '2023-07-18', activeUsers: 42 },
  { date: '2023-07-19', activeUsers: 38 },
  { date: '2023-07-20', activeUsers: 45 },
  { date: '2023-07-21', activeUsers: 51 },
  { date: '2023-07-22', activeUsers: 37 },
  { date: '2023-07-23', activeUsers: 28 },
  { date: '2023-07-24', activeUsers: 49 }
];

// Mock users data
export const users = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', role: 'client', status: 'active', lastLogin: '2023-07-24T08:30:15Z' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', role: 'client', status: 'active', lastLogin: '2023-07-23T14:22:36Z' },
  { id: 3, firstName: 'Robert', lastName: 'Johnson', email: 'robert.johnson@example.com', role: 'client', status: 'inactive', lastLogin: '2023-07-15T09:45:21Z' },
  { id: 4, firstName: 'Emily', lastName: 'Williams', email: 'emily.williams@example.com', role: 'admin', status: 'active', lastLogin: '2023-07-24T10:12:45Z' },
  { id: 5, firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com', role: 'client', status: 'active', lastLogin: '2023-07-22T16:08:33Z' }
];

// Mock tasks data
export const tasks = [
  { id: 1, title: 'Review tax return for client #1234', description: 'Perform detailed review of 2022 tax return', assigneeId: 4, assigneeName: 'Emily Williams', status: 'pending', priority: 'high', dueDate: '2023-07-28T23:59:59Z', createdAt: '2023-07-20T14:25:10Z' },
  { id: 2, title: 'Prepare quarterly filing for ABC Corp', description: 'Complete Q2 2023 filing', assigneeId: 4, assigneeName: 'Emily Williams', status: 'in_progress', priority: 'high', dueDate: '2023-07-30T23:59:59Z', createdAt: '2023-07-15T09:12:45Z' },
  { id: 3, title: 'Client consultation with Jane Smith', description: 'Discuss tax planning strategies for 2023', assigneeId: 4, assigneeName: 'Emily Williams', status: 'completed', priority: 'medium', dueDate: '2023-07-22T16:00:00Z', createdAt: '2023-07-18T11:30:00Z', completedAt: '2023-07-22T16:45:22Z' },
  { id: 4, title: 'Update client portal documentation', description: 'Revise user guides for new features', assigneeId: 4, assigneeName: 'Emily Williams', status: 'pending', priority: 'low', dueDate: '2023-08-05T23:59:59Z', createdAt: '2023-07-23T13:15:40Z' },
  { id: 5, title: 'Audit preparation for XYZ Inc', description: 'Gather and organize documents for upcoming audit', assigneeId: 4, assigneeName: 'Emily Williams', status: 'in_progress', priority: 'medium', dueDate: '2023-08-10T23:59:59Z', createdAt: '2023-07-19T10:45:12Z' }
];

// Mock client dashboard data
export const clientDashboardData = {
  // Tax summary for client dashboard
  taxSummary: {
    totalIncome: 75000,
    totalDeductions: 15000,
    estimatedTax: 8750.00,
    taxPaid: 6500.00
  },
  
  // Recent documents for client dashboard
  recentDocuments: [
    { id: 101, fileName: 'W-2 Form 2022.pdf', documentType: 'W-2', uploadedAt: '2023-02-10T09:45:12Z', taxYear: '2022' },
    { id: 102, fileName: '1099-INT Form 2022.pdf', documentType: '1099-INT', uploadedAt: '2023-02-15T11:22:36Z', taxYear: '2022' },
    { id: 103, fileName: 'Mortgage Interest Statement.pdf', documentType: 'Mortgage Interest', uploadedAt: '2023-03-05T14:18:45Z', taxYear: '2022' }
  ],
  
  // Notifications for client dashboard
  notifications: [
    { id: 201, title: 'Tax Return Ready for Review', message: 'Your 2022 tax return has been prepared and is ready for review', priority: 'info', createdAt: '2023-07-20T09:30:15Z', isRead: false },
    { id: 202, title: 'Document Uploaded', message: 'New tax document uploaded: W-2 Form 2022', priority: 'success', createdAt: '2023-02-10T09:45:12Z', isRead: true },
    { id: 203, title: 'Payment Reminder', message: 'Reminder: Quarterly estimated tax payment due in 5 days', priority: 'warning', createdAt: '2023-07-10T08:15:30Z', isRead: true },
    { id: 204, title: 'Additional Information Required', message: 'Your tax preparer has requested additional information', priority: 'high', createdAt: '2023-06-28T14:22:45Z', isRead: false },
    { id: 205, title: 'Refund Processed', message: 'Tax refund of $1,250 has been processed', priority: 'success', createdAt: '2023-05-15T11:10:22Z', isRead: true }
  ],
  
  // Upcoming appointments for client dashboard
  upcomingAppointments: [
    { id: 301, appointmentDate: '2023-08-05T14:00:00Z', duration: 60, professionalName: 'Emily Williams' },
    { id: 302, appointmentDate: '2023-07-28T10:30:00Z', duration: 45, professionalName: 'Emily Williams' },
    { id: 303, appointmentDate: '2023-08-15T15:45:00Z', duration: 30, professionalName: 'Michael Johnson' }
  ]
};