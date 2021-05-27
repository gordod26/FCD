const db = require("./db");

//create db schema
// TABLES:
// * Accounts
// * Sessions
// * Users
// * Verification_requests
// * Dposts

const nextauthschema = `
CREATE TABLE Accounts
  (
    id                   SERIAL,
    compound_id          VARCHAR(255) NOT NULL,
    user_id              INTEGER NOT NULL,
    provider_type        VARCHAR(255) NOT NULL,
    provider_id          VARCHAR(255) NOT NULL,
    provider_account_id  VARCHAR(255) NOT NULL,
    refresh_token        TEXT,
    access_token         TEXT,
    access_token_expires TIMESTAMPTZ,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE Sessions
  (
    id            SERIAL,
    user_id       INTEGER NOT NULL,
    expires       TIMESTAMPTZ NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    access_token  VARCHAR(255) NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE Users
  (
    id             SERIAL,
    name           VARCHAR(255),
    email          VARCHAR(255),
    email_verified TIMESTAMPTZ,
    image          TEXT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE Verification_requests
  (
    id         SERIAL,
    identifier VARCHAR(255) NOT NULL,
    token      VARCHAR(255) NOT NULL,
    expires    TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE UNIQUE INDEX compound_id
  ON accounts(compound_id);

CREATE INDEX provider_account_id
  ON accounts(provider_account_id);

CREATE INDEX provider_id
  ON accounts(provider_id);

CREATE INDEX user_id
  ON accounts(user_id);

CREATE UNIQUE INDEX session_token
  ON sessions(session_token);

CREATE UNIQUE INDEX access_token
  ON sessions(access_token);

CREATE UNIQUE INDEX email
  ON users(email);

CREATE UNIQUE INDEX token
  ON verification_requests(token);
`;
const userPostSchema = `
CREATE TABLE Dposts
  (
    id             SERIAL,
    user_id        INT,
    title          VARCHAR(100) NOT NULL,
    url            VARCHAR(255),
    text           TEXT,
    post_type      TEXT,
    votes          INT DEFAULT 1,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
      FOREIGN KEY(user_id)
        REFERENCES users(id)
  );
`;

const cmmtsSchema = `
CREATE TABLE fellowshipdb.public.cmmts (
id                 SERIAL,
user_id            integer not null,
dpost_id           integer not null,
parent_comment_id  int not null default 0,
cmmt               text not null,
votes              int default 1,
path               ltree,
primary key (id),
foreign key (dpost_id) references dposts(id),
foreign key (user_id) references users(id));

CREATE INDEX path_gist_comments_idx ON fellowshipdb.public.cmmts USING GIST(path);
CREATE INDEX path_comments_idx ON fellowshipdb.public.cmmts USING btree(path);

`;

const votesSchema = `
CREATE TABLE fellowshipdb.public.votes (
user_id integer not null references users(id),
post_id integer not null references dposts(id),
primary key (user_id, post_id)
)`;
//const dpostTblQry = `
//CREATE TABLE dpost
//(
//"id"           int NOT NULL,
//title        text NOT NULL,
//url          text NOT NULL,
//points       int NULL,
//username     text NOT NULL,
//num_comments int NOT NULL,
//CONSTRAINT PK_discussion_posts PRIMARY KEY ( "id" ),
//CONSTRAINT FK_15 FOREIGN KEY ( username ) REFERENCES "user" ( username )
//);
//CREATE INDEX fkIdx_16 ON dpost
//(
//username
//);
//`;
const drpTbl = `DROP TABLE IF EXISTS
Accounts,
Sessions,
Users,
Verification_requests,
Dposts,
Cmmts,
votes,
CASCADE`;

db.query(drpTbl)
  .then(() => db.query(nextauthschema))
  .then(() => db.query(userPostSchema))
  .then(() => db.query(cmmtsSchema))
  .then(() => db.query(votesSchema));
