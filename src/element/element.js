import React from 'react';
import { Ellipse, Group, Image, Rect, Text } from 'react-konva';
import { useSelector } from 'react-redux';
import { getDrawableZone } from '../shared/store/stage.reducer';

const Element = ({ shapeProps, onSelect, onChange, onMouseUp, onMouseDown, stage, transformer }) => {
  const shapeRef = React.useRef();
  const drawableZone = useSelector(getDrawableZone);

  const handleTextDbClick = (e) => {
    const textNode = shapeRef?.current;
    const tr = transformer?.current;

    const scaledFontSize = textNode.fontSize() * stage.scale().x

    // hide text node and transformer:
    textNode.hide();
    tr?.hide();

    // create textarea and style it
    let textarea = document.getElementById('text-editor');
    if (!textarea) {
      textarea = document.createElement('textarea');
      textarea.id = 'text-editor';
      const canvas = document.getElementsByClassName('konvajs-content')[0];
      canvas.appendChild(textarea);
    }

    setTextAreaPosition();

    textarea.value = textNode.text();
    textarea.style.position = 'absolute';
    textarea.style.width = textNode.width() * stage.scale().x - textNode.padding() * 4 + 'px';
    textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
    textarea.style.fontSize = scaledFontSize + 'px';
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.fontWeight = textNode.fontStyle().includes('bold') ? 'bold' : '';
    textarea.style.fontStyle = textNode.fontStyle().includes('italic') ? 'italic' : '';
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();
    const rotation = textNode.rotation();
    let transform = '';
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)';
    }

    let px = 0;
    // we need to slightly move textarea on firefox
    // because it jumps a bit
    const isFirefox =
      navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      px += 2 + Math.round(scaledFontSize / 20);
    }
    transform += 'translateY(-' + px + 'px)';

    textarea.style.transform = transform;

    textarea.style.height = textarea.scrollHeight + 3 + 'px';

    textarea.focus();

    function removeTextarea() {
      onChange({
        ...shapeProps,
        ...textNode.attrs,
        visible: true,
        width: +textarea.style.width.replace('px', '') / stage.scale().x,
      });
      textarea.parentNode.removeChild(textarea);
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('wheel', handleOutsideClick);
      window.removeEventListener('resize', setTextAreaPosition);
      textNode.show();
      tr?.show();
    }

    function setTextareaWidth(newWidth) {
      if (!newWidth) {
        // set width for placeholder
        newWidth = textNode.placeholder.length * scaledFontSize;
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

    textarea.addEventListener('keydown', function (e) {
      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && e.shiftKey) {
        textarea.value = textarea.value.trim();
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
        textarea.scrollHeight + scaledFontSize + 'px';
    });

    function handleOutsideClick(e) {
      // disable edit mode on click outside textarea or with mouse middle click
      if (e.target !== textarea || e.button === 1) {
        textarea.value = textarea.value.trim();
        textNode.text(textarea.value);
        textarea.style.height = 'auto';
        textarea.style.height =
          textarea.scrollHeight + scaledFontSize + 'px';
        removeTextarea();
      }
    }

    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
      window.addEventListener('mousedown', handleOutsideClick);
      window.addEventListener('wheel', handleOutsideClick);
      window.addEventListener('resize', setTextAreaPosition);
    });
  }

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
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      const margin = isFirefox ? 2 : -3;
      textarea.style.top = areaPosition.y + margin + 'px';
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
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
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

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            width: node.width() * scaleX,
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            width: node.width() * scaleX,
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
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
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
        // Maintain the scale of outlines while transforming
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
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
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
      <Group
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
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
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...e.target.attrs,
            ...shapeProps,
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            relativeX: node.x() - drawableZone?.x,
            relativeY: node.y() - drawableZone?.y,
          });
        }}
        // clipFunc={(ctx) => {
        //   // Begin path for clipping
        //   // Define the clipping region as a circle with radius equal to the width/height of the Group
        //   const d = new Path2D("m 838.242,389.173L592.173,247.105c-21.768-12.569-48.59-12.569-70.36,0L275.744,389.173 c-21.768,12.569-35.179,35.797-35.179,60.934v284.136c0,25.137,13.411,48.364,35.179,60.934l246.069,142.067 c21.77,12.569,48.592,12.569,70.36,0l246.069-142.067c21.77-12.57,35.181-35.797,35.181-60.934V450.107 C873.423,424.97,860.012,401.741,838.242,389.173z M556.994,364.366c-18.236,0-33.019-14.785-33.019-33.021 c0-18.236,14.783-33.021,33.019-33.021c18.238,0,33.019,14.785,33.019,33.021C590.013,349.582,575.232,364.366,556.994,364.366 z");
        //   var p = new Path2D("M 0.94574 0.58672A0.09641233444213868 0.09650474166870117 0 0 0 0.9416 0.41130000000000005A0.09641233444213868 0.09650474166870117 0 0 0 0.8776 0.2478800000000001A0.09647233444213868 0.09656474166870117 0 0 0 0.75098 0.12272000000000008A0.09643233444213867 0.09652474166870116 0 0 0 0.5866399999999999 0.05426000000000009A0.09641233444213868 0.09650474166870117 0 0 0 0.41122000000000003 0.05840000000000009A0.09643233444213867 0.09652474166870116 0 0 0 0.24768000000000004 0.12440000000000008A0.09633233444213868 0.09642474166870117 0 0 0 0.12550000000000003 0.2507800000000001A0.09633233444213868 0.09642474166870117 0 0 0 0.056100000000000025 0.41230000000000006A0.09641233444213868 0.09650474166870117 0 0 0 0.058320000000000025 0.58864A0.09643233444213867 0.09652474166870116 0 0 0 0.12432000000000003 0.7521800000000001A0.09633233444213868 0.09642474166870117 0 0 0 0.25070000000000003 0.87436A0.09633233444213868 0.09642474166870117 0 0 0 0.41222000000000003 0.94376A0.09641233444213868 0.09650474166870117 0 0 0 0.5885600000000001 0.94154A0.09641233444213868 0.09650474166870117 0 0 0 0.75198 0.87754A0.09647233444213868 0.09656474166870117 0 0 0 0.87714 0.75092A0.09643233444213867 0.09652474166870116 0 0 0 0.9456 0.58658 Z");
        //   ctx.rect(0, 0, shapeProps.width, shapeProps.height);
        //   ctx.fill(p);
        //   // Close the path
        //   // Clip to the defined region
        //   ctx.clip(p);
        // }}
      >
        <Image
          width={shapeProps.width}
          height={shapeProps.height}
          image={img}
        />
      </Group>
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

