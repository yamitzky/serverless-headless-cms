/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default {
  home: 'ホーム',
  cancel: 'キャンセル',
  delete: '削除',
  deleted: '削除しました',
  confirmDelete: (obj?: string) =>
    obj ? `「${obj}」を削除しますか？` : '削除しますか？',
  list: '一覧',
  add: '追加',
  create: (obj?: string) => (obj ? `「${obj}」を作成` : '作成'),
  manage: (obj?: string) => (obj ? `「${obj}」を管理` : '管理'),
  created: '作成しました',
  save: '保存',
  saved: '保存しました',
  edit: '編集',
  field: 'フィールド',
  fieldCreation: 'フィールド作成',
  projectCreation: 'プロジェクト作成',
  createProject: 'プロジェクトを作成',
  schemaCreation: 'スキーマ作成',
  createSchema: 'スキーマを作成',
  createdField: 'フィールドを作成しました',
  createField: 'フィールドを作成',
  article: '記事',
  displayName: '表示名',
  title: 'タイトル',
  body: '本文',
  schemaManagement: 'スキーマ管理',
  userId: 'ユーザーID',
  userManagement: 'ユーザー管理',
  invitation: '招待',
  invited: '招待されました',
  security: 'セキュリティ',
  logout: 'ログアウト',
  loggedOut: 'ログアウトしました',
  login: 'ログイン',
  projectList: 'プロジェクト一覧',
  update: '更新',
  validation: 'バリデーション',
  required: '必須',
  pattern: 'パターン(正規表現)',
  min: '最小値',
  max: '最大値',
  type: '種類',
  description: '注釈',
  pleaseSelect: '選択してください',
  referTo: '参照項目',
  text: 'テキスト',
  longtext: 'テキスト(長文)',
  richtext: 'リッチテキスト',
  reference: '参照',
  number: '数字',
  visibility: '公開設定',
  public: '公開',
  private: '非公開',
  contents: 'コンテンツ',
  listOf: (obj: string) => `${obj}一覧`,
  topPage: 'トップページ',
  invitationMessage: (obj: any) => [
    'ユーザー ID は招待するユーザーに教えてもらってください。ユーザー ID は',
    obj,
    'に記載されています。'
  ],
  noInvitation: (obj: { name?: string; link: any }) => [
    'まだ「',
    obj?.name,
    '」に誰も招待していないようです。共同編集するには、',
    obj?.link,
    'してみましょう。'
  ],
  inviteOther: '他のユーザーを招待',
  emptySchema: (obj: any) => [
    'スキーマが一つもありません。「記事」などの',
    obj,
    'してみましょう。'
  ],
  emptyProject: (obj: any) => [
    'まだプロジェクトはありません。',
    obj,
    'してみましょう。'
  ],
  emptyContent: (obj: { name?: string; link: any }) => [
    `まだ「${obj?.name}」を作成してないようです。`,
    obj?.link,
    'してみましょう。'
  ],
  emptyField: (obj: { name?: string; link: any }) => [
    `「${obj?.name}」にはまだフィールドがありません。「タイトル」や「本文」などの`,
    obj?.link,
    'してみましょう。'
  ],
  createNew: (obj: string) => `新しい「${obj}」を作成`,
  joinProject: (obj: any) => [
    '他のプロジェクトに参加するには、あなたのユーザーID',
    obj,
    'を伝えてください'
  ],
  welcomeCMS: (obj: string) => ['「', obj, '」のCMSへようこそ！'],
  topLead0: (color: any) => ['Headless, Serverless, OSS.'],
  topLead1: (color: any) => [color('日本語対応'), 'のCMS'],
  demo: 'デモを使う',
  topConceptServerlessMessage: `
  サーバーレスなので低コストでデプロイできます。
  現在は Firebase (Firestore と Auth)のみに対応していますが、
  AWSなど、その他のサーバーレス環境も予定しています。
  `,
  topConceptCustomizableMessage: `
  この CMS はオープンソースなので、フォークしてソースコードを好きなように編集できます。
  既存の業務、サービス、データベースなどにも組み込めるよう、
  より柔軟なプラグインモデルを実装する予定です。
  `,
  topConceptI18nMessage: `
  日本語と英語がサポートされています。作者(@yamitzky)は日本語ネイティブで、日本のユーザーが使いやすいことを念頭に置いています。また、英語が堪能な方、プルリクをお待ちしています！
  `,
  topRoadmapMessage: (link: any) => [
    'ロードマップは ',
    link,
    ' で管理しています。'
  ]
}
