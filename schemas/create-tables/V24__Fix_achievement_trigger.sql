DROP TRIGGER IF EXISTS achievement_check_3;

CREATE TRIGGER achievement_check_3
AFTER UPDATE
ON bet_slip FOR EACH ROW
BEGIN
    DECLARE slip_count INT;
    SET slip_count = ( SELECT COUNT(*) FROM bet_slip WHERE placed = 1 AND creator_id = NEW.creator_id AND creator_id NOT IN (SELECT editor_id AS creator_id FROM editor));
    IF slip_count = 1
        THEN
            INSERT INTO gained_achievement VALUES (3, NEW.creator_id);
    END IF;
END