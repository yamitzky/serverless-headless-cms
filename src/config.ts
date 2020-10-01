const defaultConfig = {
  publishedField: 'published',
  createdField: 'created',
  createdByField: 'createdBy',
  updatedField: 'updated',
  updatedByField: 'updatedBy',
  resourcesPath: 'applications/{{id}}/{{rid}}',
  resourcePath: 'applications/{{id}}/{{rid}}/{{iid}}',
  membershipsPath: 'memberships/{{id}}/users',
  membershipPath: 'memberships/{{id}}/users/{{uid}}',
  appsPath: 'applications',
  appPath: 'applications/{{id}}',
  userAppsPath: 'users/{{uid}}/applications',
  userAppPath: 'users/{{uid}}/applications/{{id}}',
  disableAppDefault: false,
  title: 'Serverless Headless CMS',
  hideGitHubLogo: false,
  hideLandingPage: false,
  authMethods: [
    'google',
    'facebook',
    'twitter',
    'github',
    'email',
    'phone',
    'anonymous'
  ],
  singleProject: false,

  // TODO: should be these fields project-level config?
  schemaPermission: 'everyone',
  securityPermission: 'everyone'
}

export type Config = Partial<typeof defaultConfig>

export let config = { ...defaultConfig }
if (process.env.NEXT_PUBLIC_CMS_CONFIG) {
  const customConfig = JSON.parse(process.env.NEXT_PUBLIC_CMS_CONFIG)
  config = { ...config, ...customConfig }
}
