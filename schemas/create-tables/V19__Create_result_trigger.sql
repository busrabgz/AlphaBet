CREATE TRIGGER result_check_football
AFTER INSERT
ON football_result FOR EACH ROW
BEGIN
    DECLARE bet_count INT;
    DECLARE half_home INT;
    DECLARE half_away INT;
    DECLARE red_count INT;
    DECLARE corner_count INT;
    DECLARE home INT;
    DECLARE away INT;
    DECLARE id INT;
    SET half_home = (SELECT MAX(first_half_home_goals) FROM football_result WHERE result_id = NEW.result_id);
    SET half_away = (SELECT MAX(first_half_away_goals) FROM football_result WHERE result_id = NEW.result_id);
    SET red_count = (SELECT MAX(red_card_number) FROM football_result WHERE result_id = NEW.result_id);
    SET corner_count = (SELECT MAX(corner_count) FROM football_result WHERE result_id = NEW.result_id);
    SET home = (SELECT MAX(home_score) FROM result WHERE result_id = NEW.result_id);
    SET away = (SELECT MAX(away_score) FROM result WHERE result_id = NEW.result_id);
    SET id = (SELECT MAX(match_id) FROM result WHERE result_id = NEW.result_id);

    IF red_count > 0
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "red_card_count_1");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "red_card_count_1";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "red_card_count_0");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "red_card_count_0";
            END IF;
    END IF;

    IF red_count = 1
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "red_card_count_1");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "red_card_count_1";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "red_card_count_0");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "red_card_count_0";
            END IF;
    END IF;

    IF corner_count > 7.5
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "corner_count_over_7_5");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "corner_count_over_7_5";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "corner_count_under_7_5");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "corner_count_under_7_5";
            END IF;
    END IF;

    IF corner_count < 7.5
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "corner_count_over_7_5");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "corner_count_over_7_5";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "corner_count_under_7_5");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "corner_count_under_7_5";
            END IF;
    END IF;

    IF half_home > half_away AND home > away
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "one_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_two";
            END IF;
    END IF;

    IF half_home > half_away AND home < away
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "one_two";
            END IF;
    END IF;

    IF half_home > half_away AND home = away
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "one_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_two";
            END IF;
    END IF;

    IF half_home < half_away AND home < away
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "two_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_one";
            END IF;
    END IF;

    IF half_home < half_away AND home > away
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_two";
            END IF;
    END IF;

    IF half_home < half_away AND home = away
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "two_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOSTN" WHERE match_id = id AND bet_type = "two_one";
            END IF;
    END IF;

    IF half_home = half_away AND home < away
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "zero_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_two";
            END IF;
    END IF;

    IF half_home = half_away AND home > away
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "zero_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_two";
            END IF;
    END IF;

    IF half_home = half_away AND home = away
        THEN
            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "WON" WHERE match_id = id AND bet_type = "zero_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "zero_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "zero_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_zero");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_zero";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_one");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_one";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "two_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "two_two";
            END IF;

            SET bet_count = ( SELECT COUNT(*) FROM bet WHERE match_id = id AND bet_type = "one_two");
            IF bet_count > 0
                THEN
                    UPDATE bet SET result = "LOST" WHERE match_id = id AND bet_type = "one_two";
            END IF;
    END IF;
END