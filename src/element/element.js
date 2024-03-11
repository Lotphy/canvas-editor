import React from 'react';
import { Rect, Text } from 'react-konva';

const Element = ({ shapeProps, canvasSize, onSelect, onChange }) => {
  const shapeRef = React.useRef();

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
          onDragEnd={(e) => {
            // onChange({
            //   ...shapeProps,
            //   x: e.target.x(),
            //   y: e.target.y(),
            // });
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            if (node) {
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();

              // we will reset it back
              // node.scaleX(1);
              // node.scaleY(1);
              onChange({
                ...shapeProps,
                x: node.x(),
                y: node.y(),
                // set minimal value
                width: Math.max(5, node.width()),
                height: Math.max(5, node.height()),
              });
            }
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
          onDragEnd={(e) => {
            console.log(e.target.x())
            console.log(e.target.y())
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
    </>
  );
};

export default Element;
