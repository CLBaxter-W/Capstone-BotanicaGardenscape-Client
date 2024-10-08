import { useUpdateGardenMutation } from "../components_db/gardenSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SelectList from "./SelectList";
import Loading_Bar from "./Loading_Bar";
import { setCurrentGardenCanvas } from "../components_db/gardenSlice.js";
import { setShape } from "../components_db/currentViewSlice.js";

export default function MyGarden() {
  // setup the dispatch for the subscribe on canvas
  const dispatch = useDispatch();

  // Get the current User id
  // const id = useSelector((state) => {
  //   return state.user.id;
  // });

  //console.log(`(useSelector(state) - function User() USER: ${id}`);
  const garden = useSelector((state) => {
    return state?.garden;
  });

  // console.log("myGarden page's garden", garden);
  const garden_id = garden?.garden?.[0]?.id;
  const [form, setForm] = useState({});
  console.log("24: ", form);

  //   const gardenId = useSelector((state) => {
  //     return state?.garden?.garden[0]?.id;
  //   });

  // Get the reference list for Zone
  const zoneList = useSelector((state) => {
    return state.reference.zoneList;
  });
  const shapeList = useSelector((state) => {
    return state.reference.shapeList;
  });
  const waterRequirementList = useSelector((state) => {
    return state.reference.waterRequirementList;
  });
  const sunRequirementList = useSelector((state) => {
    return state.reference.sunRequirementList;
  });
  const soilRequirementList = useSelector((state) => {
    return state.reference.soilRequirementList;
  });

  //dispatch the saved user's garden shape to the canvas
  //   shapeList?.find((shape) => {
  //     if (shape.id === form.shape_id) dispatch(setShape(shape.css_class));
  //   });

  // set up the relationship to the garden mutation
  const [updateGarden] = useUpdateGardenMutation();

  const [errM, setErrM] = useState(null);
  const [successM, setSuccessM] = useState(null);

  //CB 8/5 - This effect was the source of the double set on
  //         the shape drop list.   Commented for the moment
  //         to check in my changes - review in the am.
  // Although, this may not in fact solve the problem.
  // The form seems to not be updated by the change in the select list
  // even though, it is setForm in the function.
  useEffect(() => {
    console.log("line 59: ", garden);
    if (garden?.garden && garden.garden.length) {
      setForm(garden.garden[0]);
    }
  }, [garden]);

  //  What to do when the submit button is clicked
  const submit = async (e) => {
    e.preventDefault();
    console.log(`(useSelector(state) - function User() SUBMIT`);

    // CB  (8/5) This is also being done by the store
    // with gardenSlice.setCurrentGardenCanvas
    // in order to move away from the hardcoded shape values
    // implementing both.
    // the dispatch(setShape()) is being called by the
    // change event updateCanvasOnListChange - which happens
    // when the select list is changed
    // currently line 125
    // switch (form.shape_id) {
    //     case "dbb444c3-b50e-44ab-9aa9-51490cc4c5bd":
    //       dispatch(setShape("sq"));
    //       break;
    //     case "cc484fd1-d66c-45af-b233-246ceb282fcb":
    //       dispatch(setShape("cir"));
    //       break;
    //     default:
    //       dispatch(setShape("sq"));
    //       break;
    //   }

    try {
      let updateGardenSuccess = false;
      console.log("gardenID", garden_id);
      console.log("form preparing to submit", form);
      updateGardenSuccess = await updateGarden({ garden_id, form }).unwrap();

      if (!updateGardenSuccess) {
        return Loading_Bar("30");
      } else if (updateGardenSuccess) {
        return setSuccessM("Garden information updated successfully!");
      }
    } catch (err) {
      setErrM("whoops");
    }
  };

  const updateForm = (e) => {
    console.log(`MyGarden - updateForm: ${e.target.name}: ${e.target.value}`);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateFormOnListChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(
      `MyGarden - updateFormOnListChange: ${e.target.name}: ${e.target.value}`
    );
    console.log("MyGarden - updateFormOnListChange: ", form);
  };

  // FROM currentGardenCanvas
  // get the current garden shape stored in the state
  // variable from  currentGardenCanvas
  const updateCanvasOnListChange = (e) => {
    // set the form variable for my garden for saving this one
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    // set the variable in the store for the garden
    dispatch(setCurrentGardenCanvas(e.target.value));

    // setForm((prev) => ({
    //   ...prev,
    //   [form.shape_id]: garden.currentGardenCanvas,
    // }));

    const temp = shapeList.find((shape) => {
      if (shape.id === e.target.value) return shape.css_class;
    });

    // CB  (8/5) Adding in the setShape call for the currentViewSlice
    dispatch(setShape(temp.css_class));

    console.log(
      "MyGarden - shap_className - updateCanvasOnListChange - form: ",
      form
    );
    console.log(
      "MyGarden - shap_className - updateCanvasOnListChange - temp: ",
      temp.css_class
    );
    console.log(
      "MyGarden - shap_className - updateCanvasOnListChange - e: ",
      e.target.name,
      " - ",
      e.target.value
    );
  };
  //TO currentGardenCanvas

  return (
    <>
      <div className="container top1 center">
        {/* <div className="row w100"> */}
        {/* <div className="col"></div> */}

        <div className="col-8">
          {/* <div className="card border-success "> */}
          {/* <div className="card-body"> */}
          {/* <div className="card-text "> */}
          {garden.garden && (
            <form onSubmit={submit} name="formGardenUpdate">
              <div className="col-12 center">
                <div className="row gap-1">
                  <input
                    type="text"
                    className="form-control text_input mt-2"
                    name="description"
                    //   aria-describedby="emailHelp"
                    //   placeholder="default"
                    onChange={updateForm}
                    value={form?.description}
                    //   disabled
                    required
                  />

                  <SelectList
                    theList={zoneList}
                    theListName="zone_id"
                    theParentForm="GardenUpdate"
                    onChangeFunction={updateFormOnListChange}
                    theCurrentValue={form?.zone_id}
                    theFieldName="zone_name"
                    the2FieldName="temp_range"
                  />
                  <SelectList
                    theList={shapeList}
                    theListName="shape_id"
                    theParentForm="GardenUpdate"
                    //onChangeFunction={updateFormOnListChange}
                    onChangeFunction={updateCanvasOnListChange}
                    theCurrentValue={form?.shape_id}
                    theFieldName="shape_name"
                    the2FieldName="description"
                  />
                  <SelectList
                    theList={waterRequirementList}
                    theListName="water_requirement_id"
                    theParentForm="GardenUpdate"
                    onChangeFunction={updateFormOnListChange}
                    theCurrentValue={form?.water_requirement_id}
                    theFieldName="water_name"
                    the2FieldName="description"
                  />
                  <SelectList
                    theList={sunRequirementList}
                    theListName="sun_requirement_id"
                    theParentForm="GardenUpdate"
                    onChangeFunction={updateFormOnListChange}
                    theCurrentValue={form?.sun_requirement_id}
                    theFieldName="sun_name"
                    the2FieldName="description"
                  />
                  <SelectList
                    theList={soilRequirementList}
                    theListName="soil_requirement_id"
                    theParentForm="GardenUpdate"
                    onChangeFunction={updateFormOnListChange}
                    theCurrentValue={form?.soil_requirement_id}
                    theFieldName="soil_name"
                    the2FieldName="description"
                  />
                </div>{" "}
                {/*  //close row */}
              </div>{" "}
              {/*  //close col-12 */}
              <div className="row">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn form-control btn-outline-success btn-sm border border-success mt-2 mb-2"
                  >
                    Save Garden
                  </button>
                </div>
                {successM && (
                  <div className="row">
                    <div className="col-12">
                      <p className="text-warning">{successM}</p>
                    </div>
                  </div>
                )}
                {errM && (
                  <div className="row">
                    <div className="col-12">
                      <p className="text-warning">{errM}</p>
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
        </div>

        {/* <div className="col"></div> */}
        {/* </div>{" "} */}
      </div>
    </>
  );
}
