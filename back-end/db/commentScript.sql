drop table fellowshipdb.public.cmmts;

CREATE TABLE fellowshipdb.public.cmmts (
id SERIAL,
user_id integer not null,
dpost_id integer not null,
parent_comment_id int not null default 0,
cmmt text not null,
votes int default 1,
path ltree,
primary key (id),
foreign key (dpost_id) references dposts(id),
foreign key (user_id) references users(id));

CREATE INDEX path_gist_comments_idx ON fellowshipdb.public.cmmts USING GIST(path);
CREATE INDEX path_comments_idx ON fellowshipdb.public.cmmts USING btree(path);

insert into fellowshipdb.public.cmmts
(user_id, dpost_id, parent_comment_id, cmmt, votes, path)
values (1, 15, 0, 'this is the parent comment', 5, '0.1');
insert into fellowshipdb.public.cmmts
(user_id, dpost_id, parent_comment_id, cmmt, votes, path)
values (1, 15, 1, 'this is the child comment', 2, '0.2');
insert into fellowshipdb.public.cmmts
(user_id, dpost_id, parent_comment_id, cmmt, votes, path)
values (1, 15, 0, 'this is the baby comment', 5, '0.1.2.3');
insert into fellowshipdb.public.cmmts
(user_id, dpost_id, parent_comment_id, cmmt, votes, path)
values (1, 15, 0, 'this is the second parent comment', 5, '0.4');
insert into fellowshipdb.public.cmmts
(user_id, dpost_id, parent_comment_id, cmmt, votes, path)
values (1, 15, 0, 'this is the second child comment', 5, '0.4.5');
insert into fellowshipdb.public.cmmts
(user_id, dpost_id, parent_comment_id, cmmt, votes, path)
values (1, 16, 0, 'this is the parent comment', 5, '0.6');
insert into fellowshipdb.public.cmmts
(user_id, dpost_id, parent_comment_id, cmmt, votes, path)
values (1, 16, 1, 'this is the child comment', 2, '0.6.7');
insert into fellowshipdb.public.cmmts
(user_id, dpost_id, parent_comment_id, cmmt, votes, path)
values (1, 16, 0, 'this is the baby comment', 5, '0.6.7.8');
insert into fellowshipdb.public.cmmts
(user_id, dpost_id, parent_comment_id, cmmt, votes, path)
values (1, 16, 0, 'this is the second parent comment', 5, '0.9');
insert into fellowshipdb.public.cmmts
(user_id, dpost_id, parent_comment_id, cmmt, votes, path)
values (1, 16, 0, 'this is the second child comment', 5, '0.9.10');

