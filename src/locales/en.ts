/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// Welcome contribution!!!!!!!!!!!!!!!!!
export default {
  home: 'Home',
  cancel: 'Cancel',
  delete: 'Delete',
  deleted: 'Deleted',
  confirmDelete: (obj?: string) =>
    obj ? `Delete 「${obj}」?` : 'Are you sure you want to delete?',
  list: 'List',
  add: 'Add',
  create: (obj?: string) => (obj ? `Create "${obj}"` : 'Create'),
  manage: (obj?: string) => (obj ? `Manage "${obj}"` : 'Management'),
  created: 'Created',
  save: 'Save',
  saved: 'Saved',
  field: 'Field',
  fieldCreation: 'Create Field',
  projectCreation: 'Create Project',
  createProject: 'create project',
  schemaCreation: 'Create Schema',
  createSchema: 'create schema',
  createField: 'create field',
  createdField: 'Created Field',
  article: 'Article',
  displayName: 'Display Name',
  title: 'Title',
  body: 'Body',
  schemaManagement: 'Manage Schema',
  userId: 'User ID',
  userManagement: 'Manage User',
  invitation: 'Invitation',
  invited: 'Invited',
  security: 'Security',
  logout: 'Log out',
  loggedOut: 'Logged out',
  login: 'Log in',
  projectList: 'Project List',
  update: 'Update',
  validation: 'Validation',
  required: 'Required',
  pattern: 'Pattern (Regex)',
  min: 'Min',
  max: 'Max',
  type: 'Type',
  description: 'Description',
  pleaseSelect: 'Please select',
  referTo: 'Refer to',
  text: 'Text',
  longtext: 'Long text',
  richtext: 'Rich text',
  reference: 'Reference',
  number: 'Number',
  visibility: 'Visibility',
  public: 'Public',
  private: 'Private',
  contents: 'Contents',
  topPage: 'top page',
  invitationMessage: (obj: any) => [
    'Ask user ID to the person who want to invite. They can see their user ID on ',
    obj
  ],
  noInvitation: (obj: { name?: string; link: any }) => [
    'You have never invited to "',
    obj?.name,
    '."',
    "To colaborate, let's",
    obj?.link
  ],
  inviteOther: 'invite other users',
  emptyContent: (obj: { name?: string; link: any }) => [
    `Oops, you have never created any "${obj?.name}." Let's `,
    obj?.link
  ],
  createNew: (obj: string) => `create new "${obj}."`,
  emptySchema: (obj: any) => [
    "Oops, there seems to be no schema. Let's ",
    obj,
    ' like "articles"'
  ],
  emptyProject: (obj: any) => [
    "Oops, there seems to be no projects. Let's ",
    obj
  ],
  emptyField: (obj: { name?: string; link: any }) => [
    `Oops, there seems to be no fields in "${obj?.name}." Let's `,
    obj?.link,
    ' like "title", "body."'
  ],
  joinProject: (obj: any) => [
    'To join a project, tell your user ID ',
    obj,
    'to the project owner.'
  ],
  welcomeCMS: (obj: string) => ['Welcome to the CMS "', obj, '"'],
  topLead0: (color: any) => ['This CMS ', color('♥')],
  topLead1: (color: any) => ['Headless, Serverless, OSS.'],
  demo: 'Demo',
  topConceptServerlessMessage: `
  You can deploy to serverles environment at a very low cost.
  Currently, only Firebase(Firestore, Auth) is supported and AWS
  and other serverless solutions are planned.
  `,
  topConceptCustomizableMessage: `
  Open source software! Fork and customize it as you like. A
  more flexible plugin system will be implemented to fit to
  existing operations and databases.
  `,
  topConceptI18nMessage: `
  English and Japanese are supported.
  The project owner is a Japanese speaker, so your language support is very welcome.
  `,
  topRoadmapMessage: (link: any) => ['The roadmap is maintained on ', link]
}