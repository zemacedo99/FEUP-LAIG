/* In this file we'll:
* create the display functions for displaying the menus (start menu, end menu)
* create the functions to display the board
* create the funtions to change the display of the board as the players are playing
*/
:-use_module(library(lists)).

/* Display Main Menu */
display_main_menu:-
    write('-----------------------------------\n'),
    write('-----       Alliances         -----\n'),
    write('-----                         -----\n'),
    write('-----     1: Human / Human    -----\n'),
    write('-----     2: Human / PC       -----\n'),
    write('-----     3: PC / PC          -----\n'),
    write('-----     4: Exit             -----\n'),
    write('-----                         -----\n'),
    write('-----------------------------------\n').

/* Display Not Available Yet Menu */
display_not_yet_implemented:-
    write('-----------------------------------\n'),
    write('-----       Alliances         -----\n'),
    write('-----                         -----\n'),
    write('-----     This option is not  -----\n'),
    write('-----     available yet.      -----\n'),
    write('-----                         -----\n'),
    write('-----     0: Go back          -----\n'),
    write('-----     4: Exit             -----\n'),
    write('-----------------------------------\n').

/*
* Size of rows, from the top down: 5, 8, 9, 10, 11, 12, 11, 12, 11, 10, 9, 8, 5
*/
initial([
    ['X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X']
]).

/*Example of intermediate board*/
intermediate_board([
    [X,X,O,X,X],
    [X,X,X,O,X,X,X,X],
    [X,X,X,X,P,X,X,X,X],
    [X,X,X,X,P,X,X,X,X,X],
    [X,X,X,X,X,O,X,X,X,X,X],
    [X,X,X,X,X,O,X,X,X,X,X,X],
    [X,X,X,X,X,O,X,X,X,X,X],
    [X,X,X,X,G,X,X,X,X,X,X,X],
    [X,X,X,X,X,G,X,X,X,X,X],
    [X,X,X,X,O,G,X,X,X,X],
    [X,X,X,X,G,O,X,X,X],
    [X,X,X,X,O,X,X,X],
    [X,X,O,X,X]
]).

/* Example of final board - In this case the player on the top completes the path with orange and purple colors first*/
final_board([
    [X,X,O,X,X],
    [X,X,X,O,X,X,X,X],
    [X,X,X,X,P,O,X,X,X],
    [X,X,X,X,P,O,X,X,X,X],
    [X,X,X,X,X,O,X,X,X,X,X],
    [X,X,X,X,X,O,X,X,X,X,X,X],
    [X,X,X,X,P,O,X,X,X,X,X],
    [X,X,X,P,G,X,X,X,X,X,X,X],
    [X,X,X,X,P,G,X,X,X,X,X],
    [X,X,X,X,O,G,X,X,X,X],
    [X,X,X,X,G,O,X,X,X],
    [X,X,X,X,O,X,X,X],
    [X,X,O,X,X]
]).

display_game_computer_PC_only(Board, Player):-
    write('\n\nTURN OF PLAYER: '),
    write(Player),
    display_board(Board),
    random(1,13,RowIndex),
    generate_spaceIndex(RowIndex, SpaceIndex),
    valid_move(RowIndex,SpaceIndex,Board,Space,Player,'PConly'),
    generate_color(Color),
    move(RowIndex, SpaceIndex, Color, Board, NewBoard),
    write('\n\nPC HAS PLAYED'),
    write('\nPlease press any key followed by a dot to continue: \n'),
    read(Continue),
    display_game_computer_PC_only(NewBoard,'PC').

display_game_computer(Board,Player):-
    Player == 1,
    write('\n\nTURN OF PLAYER: '),
    write(Player),
    display_board(Board),
    write('Row in which you want to play: \n'),
    read(RowIndex),
    write('Position inside the row in which you want to play: \n' ),
    read(SpaceIndex),
    write('Choose a color option (G, P, O): \n'),
    read(Color),
    
    valid_move(RowIndex, SpaceIndex, Board, Space, Player, 2),
    move(RowIndex, SpaceIndex, Color, Board, NewBoard),
    display_game_computer(NewBoard,'PC').


display_game_computer(Board,Player):-
    Player == 'PC',
    write('\n\nTURN OF PLAYER: '),
    write(Player),
    display_board(Board),
    random(1,13,RowIndex),
    generate_spaceIndex(RowIndex, SpaceIndex),
    valid_move(RowIndex,SpaceIndex,Board,Space,Player,2),
    generate_color(Color),
    move(RowIndex, SpaceIndex, Color, Board, NewBoard),
    write('\n\nPC HAS PLAYED'),
    write('\nPlease press any key followed by a dot to continue: \n'),
    read(Continue),
    display_game_computer(NewBoard,1).
    



display_game(Board, Player):-
    Player == 1,
    write('\n\nTURN OF PLAYER: '),
    write(Player),
    display_board(Board),
    write('Row in which you want to play: \n'),
    read(RowIndex),
    write('Position inside the row in which you want to play: \n' ),
    read(SpaceIndex),
    write('Choose a color option (G, P, O): \n'),
    read(Color),
    valid_move(RowIndex, SpaceIndex, Board, Space, Player, 1),
    move(RowIndex, SpaceIndex, Color, Board, NewBoard),
    %check_for_win(NewBoard, Player),
    display_game(NewBoard, 2).

display_game(Board, Player):-
    Player == 2,
    write('\n\nTURN OF PLAYER: '),
    write(Player),
    display_board(Board),
    write('Row in which you want to play: \n'),
    read(RowIndex),
    write('Position inside the row in which you want to play: \n' ),
    read(SpaceIndex),
    write('Choose a color option (G, P, O): \n'),
    read(Color),
    valid_move(RowIndex, SpaceIndex, Board, Space, Player, 1),
    move(RowIndex, SpaceIndex, Color, Board, NewBoard),
    %check_for_win(NewBoard, Player),
    display_game(NewBoard, 1).


display_board(Board):-
    write('\n\n\n'),
    write('        |OOOOOOOOOOO|       \n'),
    display_current_board_colors(Board, 0),
    write('        |OOOOOOOOOOO|       \n'),
    write('______________________\n'),
    write('G - Green\n'),
    write('P - Purple\n'),
    write('O - Orange\n').


/* The ! mark prevents backtracking - when the board is empty goes to previous function */
display_current_board_colors([], _ ):- !.

/* Iterates over the board to get the row and displays it */
display_current_board_colors([Row | OtherRows], RowIndex):-
    /*nth0(RowIndex, Board, Row),*/
    display_board_structure_left(RowIndex),
    display_color(Row, RowIndex),
    display_board_structure_right(RowIndex),
    NextRowIndex is RowIndex + 1,
    display_current_board_colors(OtherRows, NextRowIndex).

/* The ! mark prevents backtracking - when the row is empty goes to previous function */
display_color([], _ ):- !. 

/* Displays the color, or white space, in every position of a certain row*/
display_color([Color | RestRow], ColorIndex):-
    /*nth0(ColorIndex, Row, Color),*/
    write_color(Color),
    NextColorIndex is ColorIndex + 1,
    display_color(RestRow, NextColorIndex).


write_color(Color):-
    write(Color), write(' ').

/* Write white space if that position in the board is unoccupied*/
% write_color('X'):-
%    write('X '). 

/*Writes the Green symbol*/
% write_color('G'):-
%     write('G ').

/*Writes the Purple symbol*/
% write_color('P'):-
%     write('P ').

/*Writes the Orange symbol*/
% write_color('O'):-
%     write('O ').


/*Board structure fillers to make the board look like the real game - because the board is an hexagon and has a different structure depending on the row*/ 
display_board_structure_left(0):-
    write('        | ').

display_board_structure_right(0):-
    write('|\n').

display_board_structure_left(1):-
    write('GGGGG| ').

display_board_structure_right(1):-
    write('|PPPPP\n').

display_board_structure_left(2):-
    write('GGGG| ').

display_board_structure_right(2):-
    write('|PPPP\n').

display_board_structure_left(3):-
    write('GGG| ').

display_board_structure_right(3):-
    write('|PPP\n').

display_board_structure_left(4):-
    write('GG| ').

display_board_structure_right(4):-
    write('|PP\n').

display_board_structure_left(5):-
    write('G| ').

display_board_structure_right(5):-
    write('|P\n').

display_board_structure_left(6):-
    write('  | ').

display_board_structure_right(6):-
    write('|  \n').

display_board_structure_left(7):-
    write('P| ').

display_board_structure_right(7):-
    write('|G\n').

display_board_structure_left(8):-
    write('PP| ').

display_board_structure_right(8):-
    write('|GG\n').

display_board_structure_left(9):-
    write('PPP| ').

display_board_structure_right(9):-
    write('|GGG\n').

display_board_structure_left(10):-
    write('PPPP| ').

display_board_structure_right(10):-
    write('|GGGG\n').

display_board_structure_left(11):-
    write('PPPPP| ').

display_board_structure_right(11):-
    write('|GGGGG\n').

display_board_structure_left(12):-
    write('        | ').

display_board_structure_right(12):-
    write('|       \n').
