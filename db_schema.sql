create table relationships
(
    id   integer not null
        primary key autoincrement,
    name text    not null
);

create table species
(
    id   INTEGER not null
        primary key autoincrement,
    name TEXT    not null
);

create table breeds
(
    id         INTEGER not null
        primary key autoincrement,
    species_id INTEGER not null
        references species,
    name       TEXT    not null
);

create table users
(
    id              INTEGER                   not null
        primary key autoincrement,
    first_name      TEXT                      not null,
    last_name       TEXT                      not null,
    phone           TEXT                      not null,
    email           TEXT                      not null,
    password        TEXT                      not null,
    profile_picture BLOB,
    charity_name    TEXT,
    charity_id      INTEGER,
    description     TEXT,
    country         TEXT,
    county          text,
    zip_code        text,
    address         text,
    created_at      date default current_date not null
);

create table chats
(
    id         integer                   not null
        primary key autoincrement,
    user1_id   integer                   not null
        references users,
    user2_id   integer                   not null
        references users,
    created_at date default current_date not null
);

create table feedback
(
    id          INTEGER                   not null
        primary key autoincrement,
    receiver_id INTEGER                   not null
        references users,
    sender_id   INTEGER                   not null
        references users,
    rating      INTEGER                   not null,
    comment     TEXT                      not null,
    created_at  date default current_date not null
);

create table messages
(
    id           integer                   not null
        primary key autoincrement,

    chat_id      integer not null
        references chats,
    sender_id    integer not null
        references users,
    recipient_id integer                   not null
        references users,

    message      text                      not null,
    created_at   date default current_date not null
);

create table pets
(
    id                 INTEGER not null
        primary key autoincrement,
    name               TEXT    not null,
    species_id         INTEGER not null
        references species,
    breed_id           INTEGER not null
        references breeds,
    age                INTEGER not null,
    gender             TEXT    not null,
    size               TEXT    not null,
    color              TEXT    not null,
    weight             REAL    not null,
    description        TEXT    not null,
    vaccination_status TEXT    not null,
    neutered           BOOLEAN not null,
    health_condition   TEXT,
    personality_traits TEXT,
    available          BOOLEAN not null,
    user_id            INTEGER not null
        references users,
    born_at            text    not null,
    profile_photo      BLOB    not null
);

create table adoptions
(
    id         integer not null
        primary key autoincrement,
    user_id    integer not null
        references users,
    pet_id     integer not null
        references pets,
    adopted_at date default current_date    not null
);

create table pets_relationships
(
    pet_id          integer not null
        references pets,
    relationship_id integer not null
        references relationships,
    companion       text    not null,
    primary key (pet_id, relationship_id)
);

create table posts
(
    id         INTEGER                      not null
        primary key autoincrement,
    title      TEXT                         not null,
    content    TEXT                         not null,
    image_url  TEXT,
    media_url  TEXT,
    user_id    INTEGER                      not null
        references users,
    likes      integer default 0            not null,
    dislikes   integer default 0            not null,
    created_at date    default current_date not null
);

create table comments
(
    id         INTEGER                      not null
        primary key autoincrement,
    post_id    INTEGER                      not null
        references posts,
    user_id    INTEGER                      not null
        references users,
    content    TEXT                         not null,
    likes      integer default 0            not null,
    dislikes   integer default 0            not null,
    created_at date    default current_date not null
);

create table requests
(
    id         integer                   not null
        primary key autoincrement,
    user_id    integer                   not null
        references users,
    pet_id     integer                   not null
        references pets,
    owner_id   integer                   not null
        references users,
    created_at date default current_date not null
);

create table wish_list
(
    id         INTEGER not null
        primary key autoincrement,
    user_id    INTEGER not null
        references users,
    pet_id     INTEGER not null
        references pets,
    date_added date default current_date    not null
);

