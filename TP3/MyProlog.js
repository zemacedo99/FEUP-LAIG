/**
 * MyProlog
 * @constructor
 */
class MyProlog {
    constructor(gameOrchestrator) {
        this.gameOrchestrator = gameOrchestrator;
    }

    getPrologRequest(requestString, onSuccess, onError, port) {
        var requestPort = port || 8081
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

        request.onload = onSuccess || function (data) { console.log("Request successful. Reply: " + data.target.response); };
        request.onerror = onError || function () { console.log("Error waiting for response"); };

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send();
    }

    responsesToArrays(response) {
        let array = response.split("[").map(Array)[0][2].slice(2);
        array = array.map(function (x) {
            x = x.replaceAll(']', '');
            x = x.split(",");
            return x;
        });
        array = array.filter(item => item);
        return array
    }

    gameBoardtoString(gameBoard) 
    {
        let final_array = "["
        for(let r = 0; r < gameBoard.length; r++)
        {
            let row = "["
            for(let c = 0; c < gameBoard[r].length ;c++)
            {
                if(gameBoard[r][c]._piece == null)
                {
                    row = row.concat("'X'"+ ",");
                }
                else
                {
                    console.log(gameBoard[r][c]._piece.color)
                }
            }
            row = row.slice(0, -1);
            row = row.concat("]");
            final_array = final_array.concat(row + ",");
        }
        final_array = final_array.slice(0, -1);
        final_array = final_array.concat("]");
        console.log(final_array);
        return final_array
    }

    makeRequest() {
        // Get Parameter Values
        var requestString = document.querySelector("#query_field").value;

        // Make Request
        getPrologRequest(requestString, handleReply);
    }

    //Handle the Reply
    handleReply(data) {
        document.querySelector("#query_result").innerHTML = data.target.response;
    }

    handleMoveReply(data) {
        let response = data.target.response;
        // response = this.responsesToArrays(response);
        this.gameOrchestrator.response = response;
        // console.log(this.gameOrchestrator.response);
    }

    getResponse()
    {
        return this.gameOrchestrator.response;
    }

    validMove(RowIndex, SpaceIndex, Board, Space, Player, Mode = 1) {
        Board = this.gameBoardtoString(Board);
  
        this.getPrologRequest("valid_move("+ RowIndex + "," + SpaceIndex + "," +  Board + "," + Space + "," + Player + "," + Mode +")", this.handleMoveReply.bind(this));
    }

    close() {
        this.getPrologRequest("quit");
    }

}