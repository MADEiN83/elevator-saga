const d = {
  init: (elevators, floors) => {
    const [elevator] = elevators;
    const waitingPeople = [0, 0, 0];
    const peopleWantsToGoOut = [0, 0, 0];
    let isIdle = true;

    elevator.on("idle", () => {
      console.log("idle");
      isIdle = true;
    });

    elevator.on("floor_button_pressed", n => {
      peopleWantsToGoOut[n] += 1;

      if (isIdle) {
        elevator.goToFloor(n);
      }
    });

    elevator.on("stopped_at_floor", n => {
      console.log("stopped_at_floor", n);
      waitingPeople[n] = 0;
      isIdle = true;

      onFaitQuoi();
    });

    elevator.on("passing_floor", n => {
      console.log("passing_floor", n);
    });

    floors.forEach(floor => {
      floor.on("up_button_pressed", () => {
        waitingPeople[floor.floorNum()] += 1;
        console.log("floor up", waitingPeople);
        onFaitQuoi();
      });

      floor.on("down_button_pressed", () => {
        waitingPeople[floor.floorNum()] += 1;
        onFaitQuoi();
        console.log("floor down", waitingPeople);
      });
    });

    const onFaitQuoi = () => {
      if (!isIdle) {
        return;
      }

      console.log("onFaitQuoi");

      const desGensAttendent = waitingPeople.filter(w => w !== 0);
      console.log("desGensAttendent", desGensAttendent);
    };
  },
  update: (dt, elevators, floors) => {
    // We normally don't need to do anything here
  }
};
