import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import Left_Column from "./Left_Column";
import Original_Plants from "./Original_Plants";
import Original_Containers from "./Original_Containers";
import Plants_fixed from "./Plants_fixed";

export default function Garden_fixed() {
  const [allPlants, setAllPlants] = useState(Original_Plants);
  const [allContainers, setAllContainers] = useState(Original_Containers);
  console.log("ALL PLANTS" + allPlants);
  console.log("ALL CONTAINERS" + allContainers);

  function handleDragEnd(event) {
    const plant_id = event.active.id;
    const new_cont_id = event.over?.id;
    const new_all_containers = [...allContainers];

    const old_cont_id = event.active.data.current.old_cont;

    const new_cont_obj = {
      id: new_cont_id,
      plant_id: plant_id,
      plant_pic: plant_id,
      occupied: true,
    };

    const objIndex = new_all_containers.findIndex(
      (obj) => obj.id == new_cont_id
    );
    new_all_containers[objIndex] = new_cont_obj;

    const old_cont_obj = {
      id: old_cont_id,
      plant_id: null,
      plant_pic: null,
      occupied: false,
    };

    const objOC = new_all_containers.findIndex((obj) => obj.id == old_cont_id);
    new_all_containers[objOC] = old_cont_obj;

    setAllContainers(new_all_containers);

    // if (was_garden) {
    if (old_cont_id != 50) {
      const updatedPlants2 = allPlants.map((plant) => {
        if (plant.id == plant_id) {
          return { ...plant, in_garden: false };
        } else {
          return plant;
        }
      });
      setAllPlants(updatedPlants2);
    } else {
      const updatedPlants = allPlants.map((plant) => {
        if (plant.id == plant_id) {
          return { ...plant, in_garden: true };
        } else {
          return plant;
        }
      });

      setAllPlants(updatedPlants);
    }
  }

  function DraggableMarkup({ pic, plant_id, old_cont }) {
    const path = "./src/assets/" + pic + ".png";
    return (
      <Draggable id={plant_id} old_cont={old_cont}>
        <img src={path} />{" "}
      </Draggable>
    );
  }
  function GetDroppable({ container }) {
    // console.log(container.id + container.pic + container.occupied);
    if (container.occupied) {
      //filter
      //   const result = allPlants.filter(
      //     (plant) => plant.id == container.plant_id
      //   );

      //in_garden={false}
      return (
        <Droppable key={container.id} id={container.id}>
          {" "}
          <DraggableMarkup
            key={container.plant_id}
            pic={container.plant_pic}
            plant_id={container.plant_id}
            old_cont={container.id}
          />{" "}
        </Droppable>
      );
    }
    return (
      <Droppable key={container.id} id={container.id}>
        {" "}
        <div className="white-soft"></div>
      </Droppable>
    );
  }

  return (
    <>
      <div className=" container-fluid  w100 garden_main ">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="row">
            {" "}
            {/* row*/}
            <div className="col-3 ">
              {" "}
              {/* column 1 */}
              <Left_Column />
            </div>
            <div className="col-6  center">
              {" "}
              {/* column 2 */}
              <div className="  p-2 text-light  shape ">
                <div className="mainContainer">
                  {allContainers.map((container) => (
                    <GetDroppable key={container.id} container={container} />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-3 ">
              {" "}
              {/* column 3 */}
              <Plants_fixed />
            </div>
            {/*closes row */}
          </div>
        </DndContext>
      </div>
    </>
  );
}