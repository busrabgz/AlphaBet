CREATE TRIGGER result_check_tennis
AFTER INSERT
ON tennis_result FOR EACH ROW
BEGIN
    DECLARE bet_count INT;
    DECLARE id INT;
    DECLARE first_set_winner VARCHAR(4);
    DECLARE second_set_winner VARCHAR(4);
    SET first_set_winner = (SELECT MAX(first_set_winner) FROM tennis_result WHERE result_id = NEW.result_id);
    SET second_set_winner = (SELECT MAX(second_set_winner) FROM tennis_result WHERE result_id = NEW.result_id);

    SET id = (SELECT MAX(match_id) FROM result WHERE result_id = NEW.result_id);

    IF first_set_winner = "home"
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "first_set_home");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "first_set_home";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "first_set_away");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "first_set_away";
            END IF;
    END IF;

    IF first_set_winner = "away"
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "first_set_home");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "first_set_home";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "first_set_away");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "first_set_away";
            END IF;
    END IF;

     IF second_set_winner = "home"
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "second_set_home");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "first_set_home";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "second_set_away");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "second_set_away";
            END IF;
    END IF;

    IF second_set_winner = "away"
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "second_set_home");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "second_set_home";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "second_set_away");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "second_set_away";
            END IF;
    END IF;
END