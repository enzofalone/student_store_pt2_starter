\echo 'Delete and recreate student-store db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE student_store;
CREATE DATABASE student_store;
\connect student_store

\i student_store_schema.sql

-- \echo 'Delete and recreate auth_starter_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' answer

-- DROP DATABASE auth_starter_test;
-- CREATE DATABASE auth_starter_test;
-- \connect auth_starter_test

\i student_store_seed.sql
