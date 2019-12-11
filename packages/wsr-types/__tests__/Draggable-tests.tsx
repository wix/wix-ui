import * as React from "react";
import Draggable from "wix-style-react/Draggable";
import { draggableTestkitFactory } from "wix-style-react/dist/testkit";
import { draggableTestkitFactory as draggableEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import * as enzyme from "enzyme";

function DraggableWithMandatoryProps() {
  return <Draggable />;
}

function DraggableWithAllProps() {
  return (
    <Draggable
      animationDuration={10}
      animationTiming="aa"
      canDrag={_params => {}}
      containerId="aa"
      delay={10}
      droppable
      groupName="name"
      hasDragged
      id="1"
      index={1}
      item={{}}
      listOfPropsThatAffectItems={[]}
      onDragEnd={_params => {}}
      onDragStart={_params => {}}
      onDrop={() => {}}
      onHover={_params => {}}
      onMoveOut={_params => {}}
      renderItem={_params => <span />}
      setWrapperNode={(_node, _index, _item) => {}}
      shift={[10]}
      withHandle
    />
  );
}

async function testkits() {
  const testkit = draggableTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = draggableEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });
}
