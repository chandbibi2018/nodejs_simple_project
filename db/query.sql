/* Create DB */
CREATE DATABASE mydata
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'en_IN'
       LC_CTYPE = 'en_IN'
       CONNECTION LIMIT = -1;

/* create sequence for users */
create sequence id_users
increment 1
minvalue 1 
start 1
maxvalue 9223372036854775807
cache 5;

/* create table users*/
create table users(
id bigint default nextval('id_users'::regclass),
first_name varchar(50),
last_name varchar(50),
primary key(id)
)

/* create store procedure to insert users*/
create or replace function insert_users(
IN firstname varchar(50),
IN lastname varchar(50))
RETURNS TABLE (result boolean,message varchar) AS
$BODY$
DECLARE
result boolean;
message varchar;
temp record;
BEGIN
select * into temp from users where first_name=$1;
IF FOUND THEN
result=false;
message='already exists'; 
return query select result,message;
ELSE
insert into users(first_name,last_name) values($1,$2);
result=true;
message='inserted successfully';
return query select result,message;
END IF;
END;
$BODY$
language plpgsql;