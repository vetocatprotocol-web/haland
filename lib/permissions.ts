export type Role = 'OWNER' | 'ADMIN_KLINIK' | 'DOKTER' | 'CUSTOMER';

export type ModuleName =
  | 'dashboard'
  | 'customers'
  | 'pets'
  | 'appointments'
  | 'medical-records'
  | 'pet-hotel'
  | 'petshop'
  | 'pos'
  | 'billing'
  | 'reports'
  | 'users'
  | 'settings'
  | 'profile';

export function canAccessModule(role: Role, module: ModuleName) {
  const staffModules: ModuleName[] = [
    'dashboard',
    'customers',
    'pets',
    'appointments',
    'medical-records',
    'pet-hotel',
    'petshop',
    'pos',
    'billing',
    'reports',
    'users',
    'settings',
    'profile',
  ];

  if (role === 'OWNER') {
    return staffModules.includes(module);
  }

  if (role === 'ADMIN_KLINIK') {
    return staffModules.includes(module);
  }

  if (role === 'DOKTER') {
    return ['dashboard', 'customers', 'pets', 'appointments', 'medical-records', 'pet-hotel', 'reports', 'profile'].includes(module);
  }

  return ['dashboard', 'profile'].includes(module);
}

export function canPerformAction(role: Role, module: ModuleName, action: 'create' | 'read' | 'update' | 'delete') {
  if (role === 'OWNER') {
    return true;
  }

  if (role === 'ADMIN_KLINIK') {
    if (module === 'medical-records') {
      return action === 'read';
    }
    return true;
  }

  if (role === 'DOKTER') {
    if (module === 'medical-records') {
      return ['create', 'read', 'update'].includes(action);
    }

    if (module === 'appointments') {
      return ['read', 'update'].includes(action);
    }

    return action === 'read';
  }

  return action === 'read';
}
