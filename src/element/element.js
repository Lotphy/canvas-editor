import React from 'react';
import { Ellipse, Rect, Text } from 'react-konva';

const Element = ({ shapeProps, canvasSize, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  let scale = 0;

  return (
    <>
      {
        shapeProps.type === 'text' &&
        <Text
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragStart={(e) => {
            onSelect();
          }}
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x() - canvasSize.width / 2,
              y: e.target.y() - canvasSize.height / 2,
            });
          }}
          onTransform={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x() - canvasSize.width / 2,
              y: node.y() - canvasSize.height / 2,
              width: node.width() * scaleX,
              height: node.height() * scaleY,
            });
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x() - canvasSize.width / 2,
              y: node.y() - canvasSize.height / 2,
              width: node.width() * scaleX,
              height: node.height() * scaleY,
            });
          }}
        />
      }
      {
        shapeProps.type === 'rectangle' &&
        <Rect
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragStart={(e) => {
            onSelect();
          }}
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x() - canvasSize.width / 2,
              y: e.target.y() - canvasSize.height / 2,
            });
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);

            onChange({
              ...shapeProps,
              x: node.x() - canvasSize.width / 2,
              y: node.y() - canvasSize.height / 2,
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(5, node.height() * scaleY),
            });
          }}
        />
      }
      {
        shapeProps.type === 'circle' &&
        <Ellipse
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragStart={(e) => {
            onSelect();
          }}
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x() - canvasSize.width / 2,
              y: e.target.y() - canvasSize.height / 2,
            });
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);

            onChange({
              ...shapeProps,
              x: node.x() - canvasSize.width / 2,
              y: node.y() - canvasSize.height / 2,
              radiusX: Math.max(2.5, node.radiusX() * scaleX), // Assuming radiusX for width
              radiusY: Math.max(2.5, node.radiusY() * scaleY), // Assuming radiusY for height
            });
          }}
        />
      }
    </>
  );
};

export default Element;
