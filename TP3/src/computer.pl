generate_spaceIndex(1,SpaceIndex):-
    random(1,5,SpaceIndex).

generate_spaceIndex(2,SpaceIndex):-
    random(1,8,SpaceIndex).

generate_spaceIndex(3,SpaceIndex):-
    random(1,9,SpaceIndex).

generate_spaceIndex(4,SpaceIndex):-
    random(1,10,SpaceIndex).

generate_spaceIndex(5,SpaceIndex):-
    random(1,11,SpaceIndex).

generate_spaceIndex(6,SpaceIndex):-
    random(1,12,SpaceIndex).

generate_spaceIndex(7,SpaceIndex):-
    random(1,11,SpaceIndex).

generate_spaceIndex(8,SpaceIndex):-
    random(1,12,SpaceIndex).

generate_spaceIndex(9,SpaceIndex):-
    random(1,11,SpaceIndex).

generate_spaceIndex(10,SpaceIndex):-
    random(1,10,SpaceIndex).

generate_spaceIndex(11,SpaceIndex):-
    random(1,9,SpaceIndex).

generate_spaceIndex(12,SpaceIndex):-
    random(1,8,SpaceIndex).

generate_spaceIndex(13,SpaceIndex):-
    random(1,5,SpaceIndex).

generate_color(Color):-
    random(1,3,ColorCode),
    selectColor(ColorCode,Color).

selectColor(1,Color):-
    Color = 'O'.

selectColor(2,Color):-
    Color = 'P'.

selectColor(3,Color):-
    Color = 'G'.