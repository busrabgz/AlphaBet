ALTER TABLE votes DROP COLUMN side;

ALTER TABLE votes
ADD COLUMN side varchar(8);

ALTER TABLE votes
ADD CONSTRAINT side_Check
CHECK(side IN ('HOME', 'AWAY', 'TIE'));