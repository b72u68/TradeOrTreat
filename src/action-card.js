import React from "react";
import { Grid } from "@mui/material";
import CandyCard from "./card";

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { ActionContent, ItemColumnCentered } from "../styledComponents";
import { colors } from "../data.js";
import { DeleteIcon } from "../../images/icons";

import "./WithOneAction.css";

const WithOneAction = ({
  people,
  fullSwipe,
  setStatus,
  setPeople,
  threshold,
  setThreshold,
  setSwipeAction,
  setSwipeProgress,
  setTriggeredItemAction,
}) => {
  React.useEffect(() => {
    setThreshold(0.5);
  }, [setThreshold]);

  const handleSwipeStart = () => {
    setSwipeAction("Swipe started");
    setTriggeredItemAction("None");
  };

  const handleSwipeEnd = () => {
    setSwipeAction("Swipe ended");
    setSwipeProgress();
  };

  const handleAccept = (id) => () => {
    console.log("[Handle ACCEPT]", id);
    setTriggeredItemAction(`[Handle ACCEPT] - ${id}`);
    setStatus(id, "accepted");
  };

  const handleDelete = (id) => () => {
    console.log("[Handle DELETE]", id);
    setTriggeredItemAction(`[Handle DELETE] - ${id}`);
    setPeople(people.filter((person) => person.id !== id));
  };

  const handleOnClick = (id) => () => {
    console.log("[handle on click]", id);
  };

  const leadingActions = ({ id }) => (
    <LeadingActions>
      <SwipeAction onClick={handleAccept(id)}>
        <ActionContent style={{ backgroundColor: colors.accepted }}>
          Accept
        </ActionContent>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = ({ id }) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={handleDelete(id)}>
        <ActionContent style={{ backgroundColor: colors.deleted }}>
          <ItemColumnCentered>
            <span className="icon">
              <DeleteIcon />
            </span>
            Delete
          </ItemColumnCentered>
        </ActionContent>
      </SwipeAction>
    </TrailingActions>
  );

  const candies = [
    {
      id: 1,
      name1: "Kit Kat",
      img1: "https://www.germanshop24.com/images/thumbnails/1024/1024/detailed/16/F090001450.jpg",
      name2: "Sour Patch",
      img2: "https://m.media-amazon.com/images/I/81SFEy-bzlL.jpg",
    },
    {
      id: 2,
      name1: "Sour Patch",
      img1: "https://m.media-amazon.com/images/I/81SFEy-bzlL.jpg",
      name2: "Kit Kat",
      img2: "https://www.germanshop24.com/images/thumbnails/1024/1024/detailed/16/F090001450.jpg",
    },
  ];

  return (
    <div className="basic-swipeable-list__container">
      <SwipeableList
        fullSwipe={fullSwipe}
        style={{ backgroundColor: "#555878" }}
        threshold={threshold}
        type={ListType.IOS}
      >
        <Grid container spacing={8} columns={12} style={{ padding: "8px" }}>
          {candies.map(({ id, name1, img1, name2, img2 }) => (
            <Grid item xs={12}>
              <SwipeableListItem
                key={id}
                leadingActions={leadingActions({ id })}
                trailingActions={trailingActions({ id })}
                onSwipeEnd={handleSwipeEnd}
                onSwipeProgress={setSwipeProgress}
                onSwipeStart={handleSwipeStart}
                onClick={handleOnClick(id)}
              >
                <CandyCard name={candy.name1} img={candy.img1} />
                <CandyCard name={candy.name2} img={candy.img2} />
              </SwipeableListItem>
            </Grid>
          ))}
        </Grid>
      </SwipeableList>
    </div>
  );
};

export default WithOneAction;
