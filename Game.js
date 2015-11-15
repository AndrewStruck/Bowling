var int_score = 0;
var int_ball = 1;
var int_turn = 1;
var int_frame = 1;
var arr_history = [0];
var bool_spare = false;

function Roll(int_pins){
	// Code executed to not flood console with errors after game concluded
	if (int_turn > 10){
		return "";
	}
	
	// Code executed if input is impossible in four-pin bowling
	if (int_pins > 10 || (int_pins + arr_history[0] > 10 && int_ball == 2) || (int_turn == 10 && arr_history[0] < 10 && int_ball > 1)){
		// Code executed if the player scored a strike in the previous frame
		if (arr_history[0] == 10){
			int_pins = 10;
		}
		// Code executed if the player did not score a strike in the last frame
		else{
			int_pins = 10 - arr_history[0];
		}
	}
	
	// Code executed if all frames are filled
	if (int_turn <= 10){
		int_score += int_pins;
		arr_history.unshift(int_pins);
	}
	
	// Code executed after scoring a strike
	if (arr_history[2] == 10 && int_ball != 3){
		document.getElementById("turn_" + int_frame).innerHTML = int_score;
		// Increment frame number
		int_frame++;
		int_score += arr_history[1] + int_pins;
	}
	
	//Code executed on last frame
	if (int_turn == 10){
		// Code executed on ball 1
		if (int_ball != 3){
			// Code executed after scoring a spare
			if (bool_spare == true){ 
				document.getElementById("turn_" + int_frame).innerHTML = int_score;
				// Increment frame number
				int_frame++;
				// Reset spare boolean property
				bool_spare = false;
			}
		}
		// Code executed if player scores a strike
		if (int_pins == 10){
			document.getElementById("score_" + int_ball + "_10").innerHTML = "X";
		}
		// Code executed if player scores a spare
		else if ((int_pins + arr_history[1] == 10 && int_ball == 2) || (arr_history[1] + arr_history[2] != 10 && int_ball == 3)){
			document.getElementById("score_" + int_ball + "_10").innerHTML = "/";
			int_score += int_pins;
			bool_spare == true;
		}
		// Code executed if player doesn't score a strike or spare
		else{
			document.getElementById("score_" + int_ball + "_10").innerHTML = (int_pins == 0) ? "-":int_pins;
		}
		// Code executed to determine if player gets third ball in 10th frame
		if ((int_ball == 2 && int_pins + arr_history[1] >= 10) || int_ball == 1){
			int_ball++;
		}
		// Code executed when game is over
		else{
			// Set turn number outside of bounds
			int_turn++;
			// Display score in frame
			document.getElementById("turn_10").innerHTML = int_score;
			// Return total score
			document.getElementById("FinalScore").innerHTML = "Your final score is: " + Game();
		}
	}
	//Code executed if not on last frame
	else{
		// Code executed on ball 1
		if (int_ball == 1){
			// Code executed after scoring a spare
			if (bool_spare == true){ 
				document.getElementById("turn_" + int_frame).innerHTML = int_score;
				// Sum score
				int_score += int_pins;
				// Increment frame number
				int_frame++;
				// Reset spare boolean property
				bool_spare = false;
			}
			// Code executed if player scores a strike
			if (int_pins == 10){ 
				document.getElementById("score_" + (int_ball + 1) + "_" + int_turn).innerHTML = "X";
				// Increment turn number
				int_turn++;
			}
			// Code executed if player doesn't score a strike
			else{
				document.getElementById("score_" + int_ball + "_" + int_turn).innerHTML = (int_pins == 0) ? "-":int_pins;
				// Increment ball number
				int_ball++;
			}
		}
		// Code executed on ball 2
		else{
			// Code executed if plater scores a spare
			if (int_pins + arr_history[1] == 10){
				document.getElementById("score_" + int_ball + "_" + int_turn).innerHTML = "/";
				bool_spare = true;
			}
			// Code executed if player doesn't score a spare
			else{
				document.getElementById("turn_" + int_frame).innerHTML = int_score;
				int_frame++;
				document.getElementById("score_" + int_ball + "_" + int_turn).innerHTML = int_pins;
			}
			// Reset ball number
			int_ball = 1;
			// Increment turn number
			int_turn++;
		}
	}
}

function Game(){
	return int_score;
}
