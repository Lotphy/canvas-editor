import React from 'react';
import { Ellipse, Image, Rect, Text } from 'react-konva';
import { useSelector } from 'react-redux';
import { getDrawableZone } from '../shared/store/stage.reducer';
import { useState, useEffect, useRef } from 'react';

const Element = ({ shapeProps, onSelect, onChange, stage, transformer }) => {
  const shapeRef = React.useRef();
  const drawableZone = useSelector(getDrawableZone);

  const handleTextDbClick = (e) => {
    const textNode = shapeRef?.current;
    const tr = transformer?.current;

    let lastLineMargin = 0;

    // hide text node and transformer:
    textNode.hide();
    tr.hide();

    // create textarea over canvas with absolute position
    // first we need to find position for textarea
    // how to find it?

    // create textarea and style it
    let textarea = document.getElementById('text-editor');
    if (!textarea) {
      textarea = document.createElement('textarea');
      textarea.id = 'text-editor';
      const canvas = document.getElementsByClassName('konvajs-content')[0];
      canvas.appendChild(textarea);
    }

    setTextAreaPosition();

    // apply many styles to match text on canvas as close as possible
    // remember that text rendering on canvas and on the textarea can be different
    // and sometimes it is hard to make it 100% the same. But we will try...
    textarea.value = textNode.text();
    textarea.style.position = 'absolute';
    textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
    textarea.style.height =
      textNode.height() - textNode.padding() * 2 + 5 + 'px';
    textarea.style.fontSize = textNode.fontSize() + 'px';
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();
    const rotation = textNode.rotation();
    let transform = '';
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)';
    }

    let px = 0;
    // also we need to slightly move textarea on firefox
    // because it jumps a bit
    const isFirefox =
      navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      px += 2 + Math.round(textNode.fontSize() / 20);
    }
    transform += 'translateY(-' + px + 'px)';

    textarea.style.transform = transform;

    // reset height
    // textarea.style.height = 'auto';
    // after browsers resized it we can set actual value
    textarea.style.height = textarea.scrollHeight + 3 + 'px';

    textarea.focus();

    function removeTextarea() {
      onChange({
        ...shapeProps,
        ...textNode.attrs,
        visible: true,
        width: +textarea.style.width.replace('px', ''),
        height: +textarea.style.height.replace('px', '') - lastLineMargin,
      });
      textarea.parentNode.removeChild(textarea);
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('resize', setTextAreaPosition);
      textNode.show();
      tr.show();
      lastLineMargin = 0;
    }

    function setTextareaWidth(newWidth) {
      if (!newWidth) {
        // set width for placeholder
        newWidth = textNode.placeholder.length * textNode.fontSize();
      }
      // some extra fixes on different browsers
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );
      const isFirefox =
        navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isSafari || isFirefox) {
        newWidth = Math.ceil(newWidth);
      }

      const isEdge =
        document.documentMode || /Edge/.test(navigator.userAgent);
      if (isEdge) {
        newWidth += 1;
      }
      textarea.style.width = newWidth + 'px';
    }

    textarea.addEventListener('keyup', function (e) {
      lastLineMargin = textNode.fontSize();
    });

    textarea.addEventListener('keydown', function (e) {
      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        textNode.text(textarea.value);
        removeTextarea();
      }
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        removeTextarea();
      }
    });

    textarea.addEventListener('keydown', function (e) {
      const scale = textNode.getAbsoluteScale().x;
      setTextareaWidth(textNode.width() * scale);
      textarea.style.height = 'auto';
      textarea.style.height =
        textarea.scrollHeight + lastLineMargin + 'px';
    });

    function handleOutsideClick(e) {
      if (e.target !== textarea) {
        textNode.text(textarea.value);
        textarea.style.height = 'auto';
        textarea.style.height =
          textarea.scrollHeight + textNode.fontSize() + 'px';
        removeTextarea();
      }
    }

    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
      window.addEventListener('resize', setTextAreaPosition);
    });
  }

  // TODO Reposition on window resize
  const setTextAreaPosition = () => {
    let textarea = document.getElementById('text-editor');
    if (textarea) {
      const textNode = shapeRef?.current;
      const textPosition = textNode.absolutePosition();
      // so position of textarea will be the sum of positions above:
      const areaPosition = {
        x: stage.container().offsetLeft + textPosition.x,
        y: stage.container().offsetTop + textPosition.y,
      };
      textarea.style.top = areaPosition.y + 'px';
      textarea.style.left = areaPosition.x + 'px';
    }
  }

  const renderText = () => {
    return (
      <Text
        onDblClick={() => handleTextDbClick()}
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
    )
  }

  const renderRect = () => {
    return (
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
    )
  }

  const renderEclipse = () => {
    return (
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
    )
  }

  const renderImage = () => {
    const img = new window.Image();
    img.src = shapeProps.src;
    return (
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        image={img}
        draggable
        onDragStart={(e) => {
          onSelect();
        }}
        onDragEnd={e => {
          onChange({
            ...e.target.attrs,
            ...shapeProps,
            relativeX: e.target.attrs.x - drawableZone?.x,
            relativeY: e.target.attrs.y - drawableZone?.y,
          });
        }}
        onTransformEnd={(e) => {
          onChange({
            ...e.target.attrs,
            ...shapeProps,
            relativeX: e.target.attrs.x - drawableZone?.x,
            relativeY: e.target.attrs.y - drawableZone?.y,
          });
        }}
      />
    )
  }

  return (
    <>
      {
        shapeProps.type === 'text' && renderText()
      }
      {
        shapeProps.type === 'rectangle' && renderRect()
      }
      {
        shapeProps.type === 'circle' && renderEclipse()
      }
      {
        shapeProps.type === 'image' && renderImage()
      }
    </>
  );
};

export default Element;

