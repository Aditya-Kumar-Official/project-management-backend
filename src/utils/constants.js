export const userRolesEnum = {
  ADMIN: 'admin',
  PROJECT: 'project',
  MEMBER: 'member',
};

export const availableUserRoles = Object.values(userRolesEnum);

export const taskStatusEnum = {
  IN_PROGRESS: 'in_progress',
  TODO: 'todo',
  DONE: 'done',
};

export const availableTaskStatus = Object.values(taskStatusEnum);
export const databaseName = 'PROJECT_MANAGEMENT';
