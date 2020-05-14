CREATE TABLE person(
    person_id INT,
    username VARCHAR(16) NOT NULL UNIQUE,
    password VARCHAR(16) NOT NULL,
    forename VARCHAR(20) NOT NULL,
    surname VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(person_id)
);

CREATE TABLE bet_slip_creator (
creator_id INT,
PRIMARY KEY(creator_id),
FOREIGN KEY(creator_id) REFERENCES person(person_id)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user(
    user_id INT,
    account_balance INT,
    total_winnings INT,
    alpha_coins INT,
    PRIMARY KEY(user_id),
    FOREIGN KEY (user_id) REFERENCES
    bet_slip_creator(creator_id)
    ON DELETE CASCADE
);

CREATE TABLE user_friend(
    user_id INT,
    friend_id INT,
    PRIMARY KEY(user_id, friend_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON
    DELETE CASCADE,
    FOREIGN KEY(friend_id) REFERENCES user(user_id)
    ON DELETE CASCADE
);

CREATE TABLE editor (
editor_id INT,
winrate INT,
total_winnings INT,
PRIMARY KEY(editor_id),
FOREIGN KEY(editor_id) REFERENCES
bet_slip_creator(creator_id)
ON DELETE CASCADE
);

CREATE TABLE user_follows(
editor_id INT,
user_id INT,
PRIMARY KEY(editor_id, user_id),
FOREIGN KEY (editor_id) REFERENCES editor(editor_id)
ON DELETE CASCADE,
FOREIGN KEY (user_id) REFERENCES user(user_id)
ON DELETE CASCADE
);

CREATE TABLE admin (
admin_id INT,
PRIMARY KEY(admin_id),
FOREIGN KEY (admin_id) REFERENCES person(person_id)
ON DELETE CASCADE
);


CREATE TABLE sport(
sport_name VARCHAR(20),
PRIMARY KEY(sport_name),
CHECK(sport_name IN('TENNIS', 'FOOTBALL', 'BASKETBALL'))
);

CREATE TABLE contest(
contest_id INT,
sport_name VARCHAR(20),
season VARCHAR(9),
name VARCHAR(30),
PRIMARY KEY(contest_id, season),
FOREIGN KEY(sport_name) REFERENCES
sport(sport_name)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `match`(
match_id INT,
start_date TIMESTAMP,
contest_id INT,
season VARCHAR(9),
sport_name VARCHAR(15),
referee_name VARCHAR(40),
PRIMARY KEY(match_id),
FOREIGN KEY(contest_id, season) REFERENCES
contest(contest_id, season) ON DELETE CASCADE ON
UPDATE CASCADE,
FOREIGN KEY(sport_name) REFERENCES
sport(sport_name) ON DELETE CASCADE ON UPDATE
CASCADE
);

CREATE TABLE bet (
bet_id INT,
match_id INT,
bet_type VARCHAR(30),
change_date TIMESTAMP,
odd FLOAT(5, 2),
mbn INT,
result VARCHAR(8),
active BOOLEAN,
PRIMARY KEY(bet_id, match_id),
FOREIGN KEY (match_id) REFERENCES `match`(match_id)
ON DELETE CASCADE ON UPDATE CASCADE,
CHECK(result IN ('WON', 'RESULT', 'PENDING'))
);

CREATE TABLE bet_slip (
bet_slip_id INT,
placed BOOL,
played_amount INT,
PRIMARY KEY(bet_slip_id)
);

CREATE TABLE shared_bet_slip(
bet_slip_id INT,
sharer_id INT,
PRIMARY KEY(bet_slip_id, sharer_id),
FOREIGN KEY(bet_slip_id) REFERENCES
bet_slip(bet_slip_id),
FOREIGN KEY(sharer_id) REFERENCES
bet_slip_creator(creator_id) ON DELETE CASCADE
);

CREATE TABLE suggested_bet(
editor_id INT,
bet_id INT,
match_id INT,
comment VARCHAR(255),
PRIMARY KEY(editor_id, bet_id),
FOREIGN KEY(editor_id) REFERENCES editor(editor_id) ON
DELETE CASCADE,
FOREIGN KEY(bet_id, match_id) REFERENCES bet(bet_id,
match_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE bet_slip_like(
user_id INT,
bet_slip_id INT,
PRIMARY KEY(user_id, bet_slip_id),
FOREIGN KEY(user_id) REFERENCES user(user_id) ON
DELETE CASCADE,
FOREIGN KEY(bet_slip_id) REFERENCES
bet_slip(bet_slip_id)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE included_bet(
bet_slip_id INT,
bet_id INT,
match_id INT,
PRIMARY KEY(bet_slip_id, match_id),
FOREIGN KEY(bet_slip_id) REFERENCES
bet_slip(bet_slip_id) ON DELETE CASCADE ON UPDATE
CASCADE,
FOREIGN KEY(bet_id, match_id) REFERENCES bet(bet_id,
match_id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(match_id) REFERENCES `match`(match_id)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE competitor(
competitor_id INT,
winrate FLOAT,
PRIMARY KEY(competitor_id)
);

CREATE TABLE competitor_match(
competitor_id INT,
match_id INT,
side VARCHAR(4),
PRIMARY KEY (competitor_id, match_id),
FOREIGN KEY (competitor_id) REFERENCES
competitor(competitor_id) ON DELETE CASCADE ON
UPDATE CASCADE,
FOREIGN KEY (match_id) REFERENCES `match`(match_id)
ON DELETE CASCADE ON UPDATE CASCADE,
CHECK(side IN ('HOME', 'AWAY'))
);

CREATE TABLE competitor_contest(
competitor_id INT,
contest_id INT,
season VARCHAR(9),
points INT,
PRIMARY KEY(competitor_id, contest_id, season),
FOREIGN KEY (competitor_id) REFERENCES
competitor(competitor_id) ON DELETE CASCADE ON
UPDATE CASCADE,
FOREIGN KEY(contest_id, season) REFERENCES
contest(contest_id, season) ON DELETE CASCADE ON
UPDATE CASCADE
);

CREATE TABLE individual_player (
player_id INT,
forename VARCHAR(20) NOT NULL,
surname VARCHAR(20) NOT NULL,
age INT,
PRIMARY KEY(player_id),
FOREIGN KEY(player_id) REFERENCES
competitor(competitor_id) ON DELETE CASCADE ON
UPDATE CASCADE
);

CREATE TABLE team (
team_id INT,
team_name VARCHAR(30) NOT NULL,
coach_name VARCHAR(40),
PRIMARY KEY(team_id),
FOREIGN KEY(team_id) REFERENCES
competitor(competitor_id)
ON DELETE CASCADE
ON UPDATE CASCADE
);

CREATE TABLE result (
result_id INT,
home_score INT,
away_score INT,
match_id INT,
PRIMARY KEY(result_id, match_id),
FOREIGN KEY(match_id) REFERENCES `match`(match_id)
ON DELETE CASCADE
ON UPDATE CASCADE
);

CREATE TABLE basketball_result (
result_id INT,
home_half_score INT,
away_half_score INT,
home_total_rebound_count INT,
away_total_rebound_count INT,
PRIMARY KEY (result_id),
FOREIGN KEY (result_id) REFERENCES result(result_id) ON
DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE football_result(
result_id INT,
yellow_card_number INT,
red_card_number INT,
corner_count INT,
first_half_home_goals INT,
first_half_away_goals INT,
PRIMARY KEY(result_id),
FOREIGN KEY(result_id) REFERENCES result(result_id) ON
DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tennis_result(
result_id INT,
first_set_winner VARCHAR(4),
second_set_winner VARCHAR(4),
PRIMARY KEY(result_id),
FOREIGN KEY(result_id) REFERENCES result(result_id) ON
DELETE CASCADE ON UPDATE CASCADE,
CHECK(first_set_winner IN ('HOME', 'AWAY')),
CHECK(second_set_winner IN ('HOME', 'AWAY'))
);

CREATE TABLE comment(
comment_id INT,
person_id INT,
comment VARCHAR(255),
comment_date TIMESTAMP,
PRIMARY KEY(comment_id),
FOREIGN KEY(person_id) REFERENCES person(person_id)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE bet_slip_comment(
comment_id INT,
bet_slip_id INT,
PRIMARY KEY(comment_id, bet_slip_id),
FOREIGN KEY(comment_id) REFERENCES
comment(comment_id) ON DELETE CASCADE ON UPDATE
CASCADE,
FOREIGN KEY(bet_slip_id) REFERENCES
bet_slip(bet_slip_id) ON DELETE CASCADE ON UPDATE
CASCADE
);

CREATE TABLE match_comment(
match_id INT,
comment_id INT,
PRIMARY KEY(match_id, comment_id),
FOREIGN KEY(match_id) REFERENCES `match`(match_id)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(comment_id) REFERENCES
comment(comment_id) ON DELETE CASCADE ON UPDATE
CASCADE
);

CREATE TABLE comment_likes(
comment_id INT,
user_id INT,
PRIMARY KEY(comment_id, user_id),
FOREIGN KEY(user_id) REFERENCES user(user_id) ON
DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(comment_id) REFERENCES
comment(comment_id) ON DELETE CASCADE ON UPDATE
CASCADE
);

CREATE TABLE votes(
user_id INT,
match_id INT,
side VARCHAR(8),
PRIMARY KEY(user_id, match_id),
FOREIGN KEY(user_id) REFERENCES user(user_id) ON
DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(match_id) REFERENCES `match`(match_id)
ON DELETE CASCADE ON UPDATE CASCADE,
CHECK(side IN ('HOME', 'AWAY'))
);

CREATE TABLE manages(
admin_id INT,
bet_id INT,
match_id INT,
PRIMARY KEY(admin_id, bet_id, match_id),
FOREIGN KEY(admin_id) REFERENCES admin(admin_id)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(bet_id, match_id) REFERENCES bet(bet_id,
match_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE approves(
editor_id INT,
admin_id INT,
state VARCHAR(20),
PRIMARY KEY(editor_id),
FOREIGN KEY(admin_id) REFERENCES admin(admin_id)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(editor_id) REFERENCES editor(editor_id) ON
DELETE CASCADE ON UPDATE CASCADE,
CHECK(state IN ('APPROVED', 'PENDING'))
);

CREATE TABLE shop_item(
shop_item_id INT,
item_type VARCHAR(50),
item_description MEDIUMTEXT,
cost INT,
PRIMARY KEY(shop_item_id, item_type)
);

CREATE TABLE bought_item(
shop_item_id INT,
user_id INT,
item_type VARCHAR(50),
PRIMARY KEY(shop_item_id, user_id, item_type),
FOREIGN KEY(shop_item_id, item_type) REFERENCES
shop_item(shop_item_id, item_type) ON DELETE CASCADE ON
UPDATE CASCADE,
FOREIGN KEY(user_id) REFERENCES user(user_id) ON
DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE added_item(
shop_item_id INT,
item_type VARCHAR(50),
admin_id INT,
PRIMARY KEY (shop_item_id, admin_id, item_type),
FOREIGN KEY(shop_item_id, item_type) REFERENCES
shop_item(shop_item_id, item_type) ON DELETE CASCADE
ON UPDATE CASCADE,
FOREIGN KEY(admin_id) REFERENCES admin(admin_id) ON
DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE achievement(
achievement_id INT,
achievement_name VARCHAR(40),
achievement_description MEDIUMTEXT,
PRIMARY KEY (achievement_id)
);

CREATE TABLE gained_achievement(
achievement_id INT,
user_id INT,
PRIMARY KEY(achievement_id, user_id),
FOREIGN KEY(achievement_id) REFERENCES
achievement(achievement_id) ON DELETE CASCADE ON
UPDATE CASCADE,
FOREIGN KEY(user_id) REFERENCES user(user_id) ON
DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE added_achievement(
admin_id INT,
achievement_id INT,
PRIMARY KEY(admin_id, achievement_id),
FOREIGN KEY(admin_id) REFERENCES admin(admin_id)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(achievement_id) REFERENCES
achievement(achievement_id) ON DELETE CASCADE ON
UPDATE CASCADE
);

CREATE TABLE bans(
user_id INT,
admin_id INT,
PRIMARY KEY(user_id, admin_id),
FOREIGN KEY(user_id) REFERENCES user(user_id) ON
DELETE CASCADE,
FOREIGN KEY(admin_id) REFERENCES admin(admin_id)
ON DELETE CASCADE
);