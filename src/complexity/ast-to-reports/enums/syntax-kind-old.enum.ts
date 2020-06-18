export enum SyntaxKindOld {
    Unknown = 0,
    EndOfFileToken = 1,
    SingleLineCommentTrivia = 2,
    MultiLineCommentTrivia = 3,
    NewLineTrivia = 4,
    WhitespaceTrivia = 5,
    ShebangTrivia = 6,
    ConflictMarkerTrivia = 7,
    NumericLiteral = 8,
    BigIntLiteral = 9,
    StringLiteral = 10,
    JsxText = 11,
    JsxTextAllWhiteSpaces = 12,
    RegularExpressionLiteral = 13,
    NoSubstitutionTemplateLiteral = 14,
    TemplateHead = 15,
    TemplateMiddle = 16,
    TemplateTail = 17,
    OpenBraceToken = 18,
    CloseBraceToken = 19,
    OpenParenToken = 20,
    CloseParenToken = 21,
    OpenBracketToken = 22,
    CloseBracketToken = 23,
    DotToken = 24,
    DotDotDotToken = 25,
    SemicolonToken = 26,
    CommaToken = 27,
    QuestionDotToken = 28,
    LessThanToken = 29,
    LessThanSlashToken = 30,
    GreaterThanToken = 31,
    LessThanEqualsToken = 32,
    GreaterThanEqualsToken = 33,
    EqualsEqualsToken = 34,
    ExclamationEqualsToken = 35,
    EqualsEqualsEqualsToken = 36,
    ExclamationEqualsEqualsToken = 37,
    EqualsGreaterThanToken = 38,
    PlusToken = 39,
    MinusToken = 40,
    AsteriskToken = 41,
    AsteriskAsteriskToken = 42,
    SlashToken = 43,
    PercentToken = 44,
    PlusPlusToken = 45,
    MinusMinusToken = 46,
    LessThanLessThanToken = 47,
    GreaterThanGreaterThanToken = 48,
    GreaterThanGreaterThanGreaterThanToken = 49,
    AmpersandToken = 50,
    BarToken = 51,
    CaretToken = 52,
    ExclamationToken = 53,
    TildeToken = 54,
    AmpersandAmpersandToken = 55,
    BarBarToken = 56,
    QuestionToken = 57,
    ColonToken = 58,
    AtToken = 59,
    QuestionQuestionToken = 60,
    /** Only the JSDoc scanner produces BacktickToken. The normal scanner produces NoSubstitutionTemplateLiteral and related kinds. */
    BacktickToken = 61,
    EqualsToken = 62,
    PlusEqualsToken = 63,
    MinusEqualsToken = 64,
    AsteriskEqualsToken = 65,
    AsteriskAsteriskEqualsToken = 66,
    SlashEqualsToken = 67,
    PercentEqualsToken = 68,
    LessThanLessThanEqualsToken = 69,
    GreaterThanGreaterThanEqualsToken = 70,
    GreaterThanGreaterThanGreaterThanEqualsToken = 71,
    AmpersandEqualsToken = 72,
    BarEqualsToken = 73,
    CaretEqualsToken = 74,
    Identifier = 75,
    PrivateIdentifier = 76,
    BreakKeyword = 77,
    CaseKeyword = 78,
    CatchKeyword = 79,
    ClassKeyword = 80,
    ConstKeyword = 81,
    ContinueKeyword = 82,
    DebuggerKeyword = 83,
    DefaultKeyword = 84,
    DeleteKeyword = 85,
    DoKeyword = 86,
    ElseKeyword = 87,
    EnumKeyword = 88,
    ExportKeyword = 89,
    ExtendsKeyword = 90,
    FalseKeyword = 91,
    FinallyKeyword = 92,
    ForKeyword = 93,
    FunctionKeyword = 94,
    IfKeyword = 95,
    ImportKeyword = 96,
    InKeyword = 97,
    InstanceOfKeyword = 98,
    NewKeyword = 99,
    NullKeyword = 100,
    ReturnKeyword = 101,
    SuperKeyword = 102,
    SwitchKeyword = 103,
    ThisKeyword = 104,
    ThrowKeyword = 105,
    TrueKeyword = 106,
    TryKeyword = 107,
    TypeOfKeyword = 108,
    VarKeyword = 109,
    VoidKeyword = 110,
    WhileKeyword = 111,
    WithKeyword = 112,
    ImplementsKeyword = 113,
    InterfaceKeyword = 114,
    LetKeyword = 115,
    PackageKeyword = 116,
    PrivateKeyword = 117,
    ProtectedKeyword = 118,
    PublicKeyword = 119,
    StaticKeyword = 120,
    YieldKeyword = 121,
    AbstractKeyword = 122,
    AsKeyword = 123,
    AssertsKeyword = 124,
    AnyKeyword = 125,
    AsyncKeyword = 126,
    AwaitKeyword = 127,
    BooleanKeyword = 128,
    ConstructorKeyword = 129,
    DeclareKeyword = 130,
    GetKeyword = 131,
    InferKeyword = 132,
    IsKeyword = 133,
    KeyOfKeyword = 134,
    ModuleKeyword = 135,
    NamespaceKeyword = 136,
    NeverKeyword = 137,
    ReadonlyKeyword = 138,
    RequireKeyword = 139,
    NumberKeyword = 140,
    ObjectKeyword = 141,
    SetKeyword = 142,
    StringKeyword = 143,
    SymbolKeyword = 144,
    TypeKeyword = 145,
    UndefinedKeyword = 146,
    UniqueKeyword = 147,
    UnknownKeyword = 148,
    FromKeyword = 149,
    GlobalKeyword = 150,
    BigIntKeyword = 151,
    OfKeyword = 152,
    QualifiedName = 153,
    ComputedPropertyName = 154,
    TypeParameter = 155,
    Parameter = 156,
    Decorator = 157,
    PropertySignature = 158,
    PropertyDeclaration = 159,
    MethodSignature = 160,
    MethodDeclaration = 161,
    Constructor = 162,
    GetAccessor = 163,
    SetAccessor = 164,
    CallSignature = 165,
    ConstructSignature = 166,
    IndexSignature = 167,
    TypePredicate = 168,
    TypeReference = 169,
    FunctionType = 170,
    ConstructorType = 171,
    TypeQuery = 172,
    TypeLiteral = 173,
    ArrayType = 174,
    TupleType = 175,
    OptionalType = 176,
    RestType = 177,
    UnionType = 178,
    IntersectionType = 179,
    ConditionalType = 180,
    InferType = 181,
    ParenthesizedType = 182,
    ThisType = 183,
    TypeOperator = 184,
    IndexedAccessType = 185,
    MappedType = 186,
    LiteralType = 187,
    ImportType = 188,
    ObjectBindingPattern = 189,
    ArrayBindingPattern = 190,
    BindingElement = 191,
    ArrayLiteralExpression = 192,
    ObjectLiteralExpression = 193,
    PropertyAccessExpression = 194,
    ElementAccessExpression = 195,
    CallExpression = 196,
    NewExpression = 197,
    TaggedTemplateExpression = 198,
    TypeAssertionExpression = 199,
    ParenthesizedExpression = 200,
    FunctionExpression = 201,
    ArrowFunction = 202,
    DeleteExpression = 203,
    TypeOfExpression = 204,
    VoidExpression = 205,
    AwaitExpression = 206,
    PrefixUnaryExpression = 207,
    PostfixUnaryExpression = 208,
    BinaryExpression = 209,
    ConditionalExpression = 210,
    TemplateExpression = 211,
    YieldExpression = 212,
    SpreadElement = 213,
    ClassExpression = 214,
    OmittedExpression = 215,
    ExpressionWithTypeArguments = 216,
    AsExpression = 217,
    NonNullExpression = 218,
    MetaProperty = 219,
    SyntheticExpression = 220,
    TemplateSpan = 221,
    SemicolonClassElement = 222,
    Block = 223,
    EmptyStatement = 224,
    VariableStatement = 225,
    ExpressionStatement = 226,
    IfStatement = 227,
    DoStatement = 228,
    WhileStatement = 229,
    ForStatement = 230,
    ForInStatement = 231,
    ForOfStatement = 232,
    ContinueStatement = 233,
    BreakStatement = 234,
    ReturnStatement = 235,
    WithStatement = 236,
    SwitchStatement = 237,
    LabeledStatement = 238,
    ThrowStatement = 239,
    TryStatement = 240,
    DebuggerStatement = 241,
    VariableDeclaration = 242,
    VariableDeclarationList = 243,
    FunctionDeclaration = 244,
    ClassDeclaration = 245,
    InterfaceDeclaration = 246,
    TypeAliasDeclaration = 247,
    EnumDeclaration = 248,
    ModuleDeclaration = 249,
    ModuleBlock = 250,
    CaseBlock = 251,
    NamespaceExportDeclaration = 252,
    ImportEqualsDeclaration = 253,
    ImportDeclaration = 254,
    ImportClause = 255,
    NamespaceImport = 256,
    NamedImports = 257,
    ImportSpecifier = 258,
    ExportAssignment = 259,
    ExportDeclaration = 260,
    NamedExports = 261,
    NamespaceExport = 262,
    ExportSpecifier = 263,
    MissingDeclaration = 264,
    ExternalModuleReference = 265,
    JsxElement = 266,
    JsxSelfClosingElement = 267,
    JsxOpeningElement = 268,
    JsxClosingElement = 269,
    JsxFragment = 270,
    JsxOpeningFragment = 271,
    JsxClosingFragment = 272,
    JsxAttribute = 273,
    JsxAttributes = 274,
    JsxSpreadAttribute = 275,
    JsxExpression = 276,
    CaseClause = 277,
    DefaultClause = 278,
    HeritageClause = 279,
    CatchClause = 280,
    PropertyAssignment = 281,
    ShorthandPropertyAssignment = 282,
    SpreadAssignment = 283,
    EnumMember = 284,
    UnparsedPrologue = 285,
    UnparsedPrepend = 286,
    UnparsedText = 287,
    UnparsedInternalText = 288,
    UnparsedSyntheticReference = 289,
    SourceFile = 290,
    Bundle = 291,
    UnparsedSource = 292,
    InputFiles = 293,
    JSDocTypeExpression = 294,
    JSDocAllType = 295,
    JSDocUnknownType = 296,
    JSDocNullableType = 297,
    JSDocNonNullableType = 298,
    JSDocOptionalType = 299,
    JSDocFunctionType = 300,
    JSDocVariadicType = 301,
    JSDocNamepathType = 302,
    JSDocComment = 303,
    JSDocTypeLiteral = 304,
    JSDocSignature = 305,
    JSDocTag = 306,
    JSDocAugmentsTag = 307,
    JSDocImplementsTag = 308,
    JSDocAuthorTag = 309,
    JSDocClassTag = 310,
    JSDocPublicTag = 311,
    JSDocPrivateTag = 312,
    JSDocProtectedTag = 313,
    JSDocReadonlyTag = 314,
    JSDocCallbackTag = 315,
    JSDocEnumTag = 316,
    JSDocParameterTag = 317,
    JSDocReturnTag = 318,
    JSDocThisTag = 319,
    JSDocTypeTag = 320,
    JSDocTemplateTag = 321,
    JSDocTypedefTag = 322,
    JSDocPropertyTag = 323,
    SyntaxList = 324,
    NotEmittedStatement = 325,
    PartiallyEmittedExpression = 326,
    CommaListExpression = 327,
    MergeDeclarationMarker = 328,
    EndOfDeclarationMarker = 329,
    SyntheticReferenceExpression = 330,
    Count = 331,
    FirstAssignment = 62,
    LastAssignment = 74,
    FirstCompoundAssignment = 63,
    LastCompoundAssignment = 74,
    FirstReservedWord = 77,
    LastReservedWord = 112,
    FirstKeyword = 77,
    LastKeyword = 152,
    FirstFutureReservedWord = 113,
    LastFutureReservedWord = 121,
    FirstTypeNode = 168,
    LastTypeNode = 188,
    FirstPunctuation = 18,
    LastPunctuation = 74,
    FirstToken = 0,
    LastToken = 152,
    FirstTriviaToken = 2,
    LastTriviaToken = 7,
    FirstLiteralToken = 8,
    LastLiteralToken = 14,
    FirstTemplateToken = 14,
    LastTemplateToken = 17,
    FirstBinaryOperator = 29,
    LastBinaryOperator = 74,
    FirstStatement = 225,
    LastStatement = 241,
    FirstNode = 153,
    FirstJSDocNode = 294,
    LastJSDocNode = 323,
    FirstJSDocTagNode = 306,
    LastJSDocTagNode = 323,
}