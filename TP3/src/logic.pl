/* In this file we have
* all the logic of how the game actually works, meaning:
* checking for winning and losing cases
* checking for possible places where the player can play (and where he can't) - basically have a possible positions list
* everytime a player plays, given the chosen color, the functions need to check for winning and update that space as being occupied with that color
*/

/* The player can choose between
* G : Green piece
* P : Purple piece
* O : Orange piece 
*/

/* Player 1 has the following color combinations:
* To connect orange - Orange & Purple
* To connect purple - Purple & Green
* To connect green - Green & Orange
*/

/* Player 2 has the following color combinations:
* To connect orange - Orange & Green
* To connect purple - Purple & Orange
* To connect green - Green & Purple
*/


/* map the board with coordinates */

getRow(1, [Row|_], Row).
getRow(RowIndex, [_|T], Row):-
    getRow(RowIndex2, T, Row), RowIndex is RowIndex2 + 1.

getSpace(1, [Space|_], Space).
getSpace(SpaceIndex, [_|T], Space):-
    getSpace(SpaceIndex2, T, Space), SpaceIndex is SpaceIndex2 + 1.

/* replace(+Elem, +NewElem, +List, -NewList) */
/*replace(_,_,[],[]) :- !.
*replace(Elem,NewElem,[Elem|List],[NewElem|New]): !,
*    replace(Elem,NewElem,List,New).
*/replace(Elem,NewElem,[X|List],[X|New]) :- replace(Elem,NewElem,List,New).

/*check if the row and space is an X - empty space*/



replace_row(1, SpaceIndex, Color, [Row | Rest], [New_row | Rest]):-
    replace_space(SpaceIndex, Color, Row, New_row).

replace_row(N, SpaceIndex, Color, [Row | Rest], [Row | New_rest]):-
    N > 1,
    Next is N - 1,
    replace_row(Next, SpaceIndex, Color , Rest, New_rest).

replace_space(1, Color, [_ | Rest], [Color | Rest]).

replace_space(N, Color, [X | Rest], [X | New_rest]):-
    N > 1,
    Next is N - 1,
    replace_space(Next, Color , Rest, New_rest).


move(RowIndex, SpaceIndex, Color, Board, NewBoard):-
    /*updates board*/
    replace_row(RowIndex, SpaceIndex, Color, Board, NewBoard).

check_for_win(Board, Player):-
    check_orange_win(Board,Player,1, []). 
    /*checks if there is a connection, if so, call game_over to identify winner and display game over menu*/
    
check_orange_win(Board,Player,RowIndex, ListOfColors):-
    RowIndex < 14,
    check_row(RowIndex,Board),
    fill_path(RowIndex, 1, Board, ListOfColors),
    write(ListOfColors),
    /*validate_path(RowIndex, ListOfColors),*/

    
    RowIndex2 is RowIndex +1,
    check_orange_win(Board, Player, RowIndex2, ListOfColors).


/*check if the row has the color, in this case orange*/
check_row(RowIndex, Board):-
    getRow(RowIndex, Board, Row),
    member('O', Row).
    


fill_path(RowIndex, SpaceIndex, Board, ListOfColors):-
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),

    Space == 'O',

    validate_path(RowIndex,SpaceIndex,ListOfColors),
    ColorInfo == [RowIndex,SpaceIndex],
    append(ColorInfo, ListOfColors, ListOfColors2),

    length(Row,SizeOfRow),
    SpaceIndex <= SizeOfRow,
    SpaceIndex2 is SpaceIndex +1,
    fill_path(RowIndex, SpaceIndex2, Board, ListOfColors2).

fill_path(RowIndex, SpaceIndex, Board, ListOfColors):-
    getRow(RowIndex, Board, Row),
    getSpace(SpaceIndex, Row, Space),

    Space /= 'O',
    
    length(Row,SizeOfRow),
    SpaceIndex <= SizeOfRow,
    SpaceIndex2 is SpaceIndex +1,
    fill_path(RowIndex, SpaceIndex2, Board, ListOfColors).


validate_path(1,ListOfColors).
    
validate_path(2, ListOfColors):-

get_space_onList(_,_,[]).

get_space_onList(RowIndex, SpaceIndex,[H|Rest]):-
    nth1(1,H,NewRowIndex),
    NewRowIndex /= RowIndex,
    get_space_onList(RowIndex,SpaceIndex,Rest).

get_space_onList(RowIndex, SpaceIndex,[H|Rest]):-
    nth1(1,H,NewRowIndex),
    NewRowIndex == RowIndex,
    nth1(2,H,NewSpaceIndex),
    SpaceIndex is NewSpaceIndex,
    ListThisRow.append(H),
    get_space_onList(RowIndex,SpaceIndex,Rest).


check_LastRowSpace36(SpaceIndex,LastSpaceIndex):-
    check_LastRowSpaceIqual(SpaceIndex,LastSpaceIndex),
    check_LastRowSpaceMinus1(SpaceIndex,LastSpaceIndex).

check_LastRowSpaceIqual(SpaceIndex,LastSpaceIndex):-
    SpaceIndex == LastSpaceIndex. 

check_LastRowSpaceMinus1(SpaceIndex,LastSpaceIndex):-
    SpaceIndex == LastSpaceIndex - 1.




f36([]).
f36(ListOfColors):-

    get_space_onList(LastRowIndex, LastSpaceIndex,ListOfColors),

    check_LastRowSpace36(SpaceIndex,LastSpaceIndex),
    
    f36(ListOfColors).


validate_path(RowIndex,SpaceIndex,ListOfColors):-
    /* Ex. of ListOfColors [[1,3],[1,4],[2,5],[2,6]] */
    RowIndex >= 3,
    RowIndex <= 6,
    LastRowIndex is RowIndex - 1,

    f36(ListOfColors),




    /*
    Obter na lista o RowIndex, ex 2 
    ver o spaceIndex  associado,  ex 5 
    verificar se a RowIndex-1 (ex 1) com o spaceIndex ou spaceIndex - 1 existe

    */
    

validate_path(8, SpaceIndex,ListOfColors):-
    
validate_path(RowIndex, SpaceIndex,ListOfColors):-
    RowIndex >= 7,
    RowIndex /= 8,
    RowIndex <= 12,

validate_path(13, SpaceIndex,ListOfColors):-






/*Takes the Player and switches to the other one*/
/*next_player(1, NewPlayer):-
    NewPlayer = 2.

next_player(2, NewPlayer):-
    NewPlayer = 1.*/



/*__________________________________________________________*/

/* check if the game is over and identify the winner */
game_over(+GameState, -Winner):-
    check_game_over(Board),
    display_board(Board).


