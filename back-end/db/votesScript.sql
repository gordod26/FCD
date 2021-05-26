drop table if exists fellowshipdb.public.votes;

CREATE TABLE fellowshipdb.public.votes (
user_id integer not null references users(id),
post_id integer not null references dposts(id),
primary key (user_id, post_id)
);

insert into fellowshipdb.public.votes
values (1, 15);

insert into fellowshipdb.public.votes 
values (1, 16);