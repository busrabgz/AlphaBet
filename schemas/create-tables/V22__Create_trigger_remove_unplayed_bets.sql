CREATE TRIGGER remove_unplayed_bets
AFTER INSERT ON result FOR EACH ROW
BEGIN
    DELETE included_bet FROM included_bet INNER JOIN bet_slip b WHERE included_bet.bet_slip_id = b.bet_slip_id
                                                                  AND b.placed = FALSE and included_bet.match_id
                                                                                               = NEW.match_id;
end;