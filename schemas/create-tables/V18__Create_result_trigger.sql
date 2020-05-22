CREATE TRIGGER result_check
AFTER INSERT
ON result FOR EACH ROW
BEGIN
    DECLARE bet_count INT;
    IF NEW.home_score > NEW.away_score
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "mr_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = NEW.match_id AND bet_type = "mr_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "mr_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = NEW.match_id AND bet_type = "mr_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "mr_draw");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = NEW.match_id AND bet_type = "mr_draw";
            END IF;
    END IF;

    IF NEW.away_score > NEW.home_score
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "mr_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = NEW.match_id AND bet_type = "mr_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "mr_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = NEW.match_id AND bet_type = "mr_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "mr_draw");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = NEW.match_id AND bet_type = "mr_draw";
            END IF;
    END IF;

    IF NEW.away_score = NEW.home_score
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "mr_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = NEW.match_id AND bet_type = "mr_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "mr_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = NEW.match_id AND bet_type = "mr_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "mr_draw");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = NEW.match_id AND bet_type = "mr_draw";
            END IF;
    END IF;

    IF NEW.away_score + NEW.home_score > 2.5
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "over_2_5");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = NEW.match_id AND bet_type = "over_2_5";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "under_2_5");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = NEW.match_id AND bet_type = "under_2_5";
            END IF;
    END IF;

    IF NEW.away_score + NEW.home_score < 2.5
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "over_2_5");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = NEW.match_id AND bet_type = "over_2_5";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "under_2_5");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = NEW.match_id AND bet_type = "under_2_5";
            END IF;
    END IF;

    IF NEW.away_score + NEW.home_score < 2.5
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "over_2_5");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = NEW.match_id AND bet_type = "over_2_5";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = NEW.match_id AND bet_type = "under_2_5");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = NEW.match_id AND bet_type = "under_2_5";
            END IF;
    END IF;
END