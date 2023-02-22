
/**
 * validate_row(+Board , +Row)
 * 
 * Succeeds if the row corresponds to a board row.
 */
validate_row(Board,Row):-
    length(Board,Check),
    Check < Row,
    write('Invalid Row! Try again..\n\n').

/**
 * validate_column(+Row, +SpaceIndex)
 * 
 * Succeeds if the SpaceIndex is in the row
 */
validate_column(Row,SpaceIndex):-
    length(Row,Check),
    Check < SpaceIndex,
    write('Invalid Column! Try again..\n\n').


valid_move(RowIndex, SpaceIndex, Board, Space, Player, Mode):-
    Mode == 1,
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),
    Space == 'X'.

valid_move(RowIndex, SpaceIndex, Board, Space, Player, Mode):-
    Mode == 1,
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),
    Space == 'O',
    write('\n\nINVALID MOVE\n'),
    write('\nPlease try again, choose an empty position (X)\n'),
    display_game(Board, Player).

valid_move(RowIndex, SpaceIndex, Board, Space, Player, Mode):-
    Mode == 1,
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),
    Space == 'P',
    write('\n\nINVALID MOVE\n'),
    write('\nPlease try again, choose an empty position (X)\n'),
    display_game(Board, Player).

valid_move(RowIndex, SpaceIndex, Board, Space, Player, Mode):-
    Mode == 1,
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),
    Space == 'G',
    write('\n\nINVALID MOVE\n'),
    write('\nPlease try again, choose an empty position (X)\n'),
    display_game(Board, Player).

valid_move(RowIndex, SpaceIndex, Board, Space, Player, Mode):-
    Mode == 2,
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),
    Space == 'X'.

valid_move(RowIndex, SpaceIndex, Board, Space, Player, Mode):-
    Mode == 2,
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),
    Space == 'O',
    write('\n\nINVALID MOVE\n'),
    write('\nPlease try again, choose an empty position (X)\n'),
    display_game_computer(Board, Player).

valid_move(RowIndex, SpaceIndex, Board, Space, Player, Mode):-
    Mode == 2,
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),
    Space == 'P',
    write('\n\nINVALID MOVE\n'),
    write('\nPlease try again, choose an empty position (X)\n'),
    display_game_computer(Board, Player).

valid_move(RowIndex, SpaceIndex, Board, Space, Player, Mode):-
    Mode == 2,
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),
    Space == 'G',
    write('\n\nINVALID MOVE\n'),
    write('\nPlease try again, choose an empty position (X)\n'),
    display_game_computer(Board, Player).

valid_move(RowIndex, SpaceIndex, Board, Space, Player, 'PConly'):-
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),
    Space == 'X'.

valid_move(RowIndex, SpaceIndex, Board, Space, Player, 'PConly'):-
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),
    Space == 'O',
    write('\n\nINVALID MOVE\n'),
    write('\nPlease try again, choose an empty position (X)\n'),
    display_game_computer_PC_only(Board, Player).

valid_move(RowIndex, SpaceIndex, Board, Space, Player, 'PConly'):-
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),
    Space == 'P',
    write('\n\nINVALID MOVE\n'),
    write('\nPlease try again, choose an empty position (X)\n'),
    display_game_computer_PC_only(Board, Player).

valid_move(RowIndex, SpaceIndex, Board, Space, Player, 'PConly'):-
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),
    Space == 'G',
    write('\n\nINVALID MOVE\n'),
    write('\nPlease try again, choose an empty position (X)\n'),
    display_game_computer_PC_only(Board, Player).

