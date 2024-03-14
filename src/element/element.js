import React from 'react';
import { Ellipse, Rect, Text } from 'react-konva';
import { useSelector } from 'react-redux';
import { getDrawableZone } from '../shared/store/stage.reducer';

const Element = ({ shapeProps, onSelect, onChange, stage, transformer }) => {
  const shapeRef = React.useRef();
  const drawableZone = useSelector(getDrawableZone);

  const handleTextDbClick = (e) => {
    // const textNode = shapeRef?.current;
    // // hide text node and transformer:
    // textNode.hide();
    //
    // const textPosition = textNode.absolutePosition();
    //
    // // so position of textarea will be the sum of positions above:
    // const areaPosition = {
    //   x: stage.container().offsetLeft + textPosition.x,
    //   y: stage.container().offsetTop + textPosition.y,
    // };
    //
    // // create textarea and style it
    // const textarea = document.createElement('textarea');
    // const canvas = document.getElementsByClassName('konvajs-content')[0];
    // canvas.appendChild(textarea);
    //
    // // apply many styles to match text on canvas as close as possible
    // // remember that text rendering on canvas and on the textarea can be different
    // // and sometimes it is hard to make it 100% the same. But we will try...
    // textarea.value = textNode.text();
    // textarea.style.position = 'absolute';
    // textarea.style.top = areaPosition.y + 'px';
    // textarea.style.left = areaPosition.x + 'px';
    // textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
    // textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
    // textarea.style.fontSize = textNode.fontSize() + 'px';
    // textarea.style.border = 'none';
    // textarea.style.padding = '0px';
    // textarea.style.margin = '0px';
    // textarea.style.overflow = 'hidden';
    // textarea.style.background = 'none';
    // textarea.style.outline = 'none';
    // textarea.style.resize = 'none';
    // textarea.style.lineHeight = textNode.lineHeight();
    // textarea.style.fontFamily = textNode.fontFamily();
    // textarea.style.transformOrigin = 'left top';
    // textarea.style.textAlign = textNode.align();
    // textarea.style.color = textNode.fill();
    // textarea.style.zIndex = '20';
    // const rotation = textNode.rotation();
    // let transform = '';
    // if (rotation) {
    //   transform += 'rotateZ(' + rotation + 'deg)';
    // }
    //
    // let px = 0;
    // // also we need to slightly move textarea on firefox
    // // because it jumps a bit
    // const isFirefox =
    //   navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    // if (isFirefox) {
    //   px += 2 + Math.round(textNode.fontSize() / 20);
    // }
    // transform += 'translateY(-' + px + 'px)';
    //
    // textarea.style.transform = transform;
    //
    // // reset height
    // // textarea.style.height = 'auto';
    // // after browsers resized it we can set actual value
    // // textarea.style.height = textarea.scrollHeight + 3 + 'px';
    //
    // textarea.focus();
    //
    // function removeTextarea() {
    //   textarea.parentNode.removeChild(textarea);
    //   window.removeEventListener('click', handleOutsideClick);
    // }
    //
    // function setTextareaWidth(newWidth) {
    //   if (!newWidth) {
    //     // set width for placeholder
    //     newWidth = textNode.placeholder.length * textNode.fontSize();
    //   }
    //   // some extra fixes on different browsers
    //   const isSafari = /^((?!chrome|android).)*safari/i.test(
    //     navigator.userAgent
    //   );
    //   const isFirefox =
    //     navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    //   if (isSafari || isFirefox) {
    //     newWidth = Math.ceil(newWidth);
    //   }
    //
    //   const isEdge =
    //     document.documentMode || /Edge/.test(navigator.userAgent);
    //   if (isEdge) {
    //     newWidth += 1;
    //   }
    //   textarea.style.width = newWidth + 'px';
    // }
    //
    // textarea.addEventListener('keydown', function (e) {
    //   const node = shapeRef.current;
    //   onChange({
    //     ...shapeProps,
    //     text: textarea.value,
    //     height: textarea.scrollHeight,
    //     x: node.x(),
    //     y: node.y(),
    //   })
    //   // hide on enter
    //   // but don't hide on shift + enter
    //   if (e.keyCode === 13 && !e.shiftKey) {
    //     const node = shapeRef.current;
    //     onChange({
    //       ...shapeProps,
    //       text: textarea.value,
    //       height: textarea.scrollHeight,
    //       x: node.x(),
    //       y: node.y(),
    //     })
    //     textNode.show();
    //     removeTextarea();
    //   }
    //   // on esc do not set value back to node
    //   if (e.keyCode === 27) {
    //     textNode.show();
    //     removeTextarea();
    //   }
    // });
    //
    // textarea.addEventListener('keydown', function (e) {
    //   const scale = textNode.getAbsoluteScale().x;
    //   setTextareaWidth(textNode.width() * scale);
    //   textarea.style.height = 'auto';
    //   textarea.style.height = textarea.scrollHeight + textNode.fontSize() + 'px';
    // });
    //
    // function handleOutsideClick(e) {
    //   if (e.target !== textarea) {
    //     const node = shapeRef.current;
    //     onChange({
    //       ...shapeProps,
    //       text: textarea.value,
    //       x: node.x(),
    //       y: node.y(),
    //     })
    //     textNode.show();
    //     removeTextarea();
    //   }
    // }
    // setTimeout(() => {
    //   window.addEventListener('click', handleOutsideClick);
    // });
  }

  return (
    <>
      {
        shapeProps.type === 'text' &&
        <Text
          onDblClick={handleTextDbClick}
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragStart={(e) => {
            onSelect();
          }}
          onDragEnd={e => {
            const node = shapeRef.current;
            onChange({
              ...shapeProps,
              relativeX: node.x() - drawableZone?.x,
              relativeY: node.y() - drawableZone?.y,
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
              width: node.width() * scaleX,
              height: node.height() * scaleY,
              relativeX: node.x() - drawableZone?.x,
              relativeY: node.y() - drawableZone?.y,
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
          onDragEnd={e => {
            const node = shapeRef.current;
            onChange({
              ...shapeProps,
              relativeX: node.x() - drawableZone?.x,
              relativeY: node.y() - drawableZone?.y,
            });
          }}
          onTransform={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(5, node.height() * scaleY),
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
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(5, node.height() * scaleY),
              relativeX: node.x() - drawableZone?.x,
              relativeY: node.y() - drawableZone?.y,
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
          onDragEnd={e => {
            const node = shapeRef.current;
            onChange({
              ...shapeProps,
              relativeX: node.x() - drawableZone?.x,
              relativeY: node.y() - drawableZone?.y,
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
              radiusX: Math.max(2.5, node.radiusX() * scaleX), // Assuming radiusX for width
              radiusY: Math.max(2.5, node.radiusY() * scaleY), // Assuming radiusY for height
              relativeX: node.x() - drawableZone?.x,
              relativeY: node.y() - drawableZone?.y,
            });
          }}
        />
      }
    </>
  );
};

export default Element;
