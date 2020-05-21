CREATE TRIGGER result_check_basketball
AFTER INSERT
ON basketball_result FOR EACH ROW
BEGIN
    DECLARE bet_count INT;
    DECLARE home_rebound INT;
    DECLARE away_rebound INT;
    DECLARE home_score INT;
    DECLARE away_score INT;
    DECLARE id INT;
    SET home_rebound = (SELECT MAX(home_total_rebound_count) FROM basketball_result WHERE result_id = NEW.result_id);
    SET away_rebound = (SELECT MAX(away_total_rebound_count) FROM basketball_result WHERE result_id = NEW.result_id);
    SET home_score = (SELECT MAX(home_score) FROM result WHERE result_id = NEW.result_id);
    SET away_score = (SELECT MAX(away_score) FROM result WHERE result_id = NEW.result_id);
    SET id = (SELECT MAX(match_id) FROM result WHERE result_id = NEW.result_id);

    IF home_rebound + away_rebound > 20.5
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "rebound_over_x");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "rebound_over_x";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "rebound_under_x");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "rebound_under_x";
            END IF;
    END IF;

    IF home_rebound + away_rebound < 20.5
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "rebound_over_x");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "rebound_over_x";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "rebound_under_x");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "rebound_under_x";
            END IF;
    END IF;

    IF home_score + away_score > 95.5
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "total_score_over_x");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "total_score_over_x";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "total_score_under_x");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "total_score_under_x";
            END IF;
    END IF;

    IF home_score + away_score < 95.5
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "total_score_under_x");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "total_score_under_x";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "total_score_under_x");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "total_score_under_x";
            END IF;
    END IF;

END