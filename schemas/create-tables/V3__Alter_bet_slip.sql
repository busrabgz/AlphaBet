ALTER TABLE bet_slip ADD creator_id INT;
ALTER TABLE bet_slip ADD CONSTRAINT creator_id FOREIGN KEY (creator_id) REFERENCES bet_slip_creator(creator_id);