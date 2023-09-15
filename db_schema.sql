create table users
(
    id              INTEGER not null
        primary key autoincrement,
    first_name      TEXT,
    last_name       TEXT,
    phone           TEXT,
    email           TEXT    not null unique,
    password        TEXT    not null,
    profile_picture BLOB,
    charity_name    TEXT,
    charity_id      INTEGER,
    description     TEXT,
    country         TEXT,
    county          text,
    zip_code        text,
    location        text,
    created_at      date default current_date
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

create table chats
(
    id         integer                   not null
        primary key autoincrement,
    adopter_id integer                   not null
        references users,
    pet_id     integer                   not null
        references pets,
    owner_id   integer                   not null
        references users,
    created_at date default current_date not null
);

create table messages
(
    id           integer                   not null
        primary key autoincrement,

    chat_id      integer                   not null
        references chats,
    sender_id    integer                   not null
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
    name               TEXT,
    species            text,
    breed              text,
    age                INTEGER,
    gender             TEXT,
    size               TEXT,
    color              TEXT,
    weight             REAL,
    description        TEXT,
    vaccination_status TEXT,
    neutered           BOOLEAN,
    health_condition   TEXT,
    personality_traits TEXT,
    available          BOOLEAN,
    user_id            INTEGER not null
        references users,
    born_at            date default current_date,
    profile_photo      BLOB
);

create table relationships
(
    id   integer not null
        primary key autoincrement,
    name text    not null
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

create table wish_list
(
    id         INTEGER                   not null
        primary key autoincrement,
    user_id    INTEGER                   not null
        references users,
    pet_id     INTEGER                   not null
        references pets,
    date_added date default current_date not null
);

create table requests
(
    id         integer                   not null
        primary key autoincrement,
    adopter_id integer                   not null
        references users,
    pet_id     integer                   not null
        references pets,
    owner_id   integer                   not null
        references users,
    status     text                      null,
    created_at date default current_date not null
);

create table adoptions
(
    id         integer                   not null
        primary key autoincrement,
    user_id    integer                   not null
        references users,
    pet_id     integer                   not null
        references pets,
    adopted_at date default current_date not null
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

insert into users (first_name, last_name, email, password, charity_name, charity_id, location)
values ('Test', 'Test', 'example@email.com', 'password', '', '', 'Loc1'),
       ('First', 'Adopter', 'first.adopter@email.com', 'password', '', '', 'Loc2'),
       ('Second', 'Adopter', 'second.adopter@email.com', 'password', '', '', 'Loc3'),
       ('Third', 'Adopter', 'third.adopter@email.com', 'password', '', '', 'Loc4'),
       ('First', 'Shelter', 'first.shelter@email.com', 'password', 'Shelter 1', '1234', 'Loc5'),
       ('Second', 'Shelter', 'second.shelter@email.com', 'password', 'Shelter 2', '5678', 'Loc6');

insert into pets (name, species, age, gender, size, color, weight, description, available, user_id, profile_photo)
values ('Max', 'Dog', 2, 'male', 'medium', 'black', 17, 'A very cute dog and my favourite!', 1, 6,
        '/public/uploads/dog3.jpeg'),
       ('Luna', 'Dog', 1, 'female', 'small', 'white', 5, 'Small and nice dog!', 1, 5, '/public/uploads/dog6.jpeg'),
       ('Thor', 'Dog', 3, 'male', 'large', 'gold', 25, 'Best companion!', 1, 5, '/public/uploads/dog5.jpeg'),
       ('Nova', 'Cat', 2, 'female', 'small', 'multi-color', 4, 'Quick reflexes.', 1, 6, '/public/uploads/cat10.jpeg'),
       ('Bella', 'Cat', 2, 'female', 'small', 'orange', 3, 'Sharp teeth', 1, 6, '/public/uploads/cat5.jpeg'),
       ('Felix', 'Cat', 2, 'male', 'small', 'black', 4, 'Funny', 1, 5, '/public/uploads/cat6.jpeg');

insert into wish_list (user_id, pet_id, date_added)
values (2, 1, current_date),
       (3, 2, current_date),
       (4, 3, current_date);

insert into requests (adopter_id, pet_id, owner_id, created_at)
values (2, 1, 6, current_date),
       (2, 2, 5, current_date);

insert into chats (adopter_id, pet_id, owner_id, created_at)
values (2, 1, 6, current_date),
       (2, 2, 5, current_date);