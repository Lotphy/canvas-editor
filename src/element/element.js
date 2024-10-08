import React, { useContext } from 'react';
import { Ellipse, Group, Image, Rect, Shape, Text } from 'react-konva';
import EditorContext from '../shared/EditorContext';

const Element = ({ shapeProps, onSelect, onChange, onMouseUp, onMouseDown, stage, transformer }) => {
  const shapeRef = React.useRef();
  const editorContext = useContext(EditorContext);

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
      textarea?.parentNode?.removeChild(textarea);
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
        textarea.style.height = textarea.scrollHeight + scaledFontSize + 'px';
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
            relativeX: node.x() - editorContext.params.drawableZone?.x,
            relativeY: node.y() - editorContext.params.drawableZone?.y,
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
            relativeX: node.x() - editorContext.params.drawableZone?.x,
            relativeY: node.y() - editorContext.params.drawableZone?.y,
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
            relativeX: node.x() - editorContext.params.drawableZone?.x,
            relativeY: node.y() - editorContext.params.drawableZone?.y,
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
            relativeX: node.x() - editorContext.params.drawableZone?.x,
            relativeY: node.y() - editorContext.params.drawableZone?.y,
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
            relativeX: node.x() - editorContext.params.drawableZone?.x,
            relativeY: node.y() - editorContext.params.drawableZone?.y,
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
            relativeX: node.x() - editorContext.params.drawableZone?.x,
            relativeY: node.y() - editorContext.params.drawableZone?.y,
          });
        }}
      />
    )
  }

  const renderImage = () => {
    const img = new window.Image();
    img.src = shapeProps.src.includes('data:image') ? shapeProps.src : require(`./${shapeProps.src}`);

    img.onload = () => {
      shapeProps.loaded = true;
    }

		let cropParams = {}
	  if (shapeProps.mask) {
			let cropX = 0, cropY = 0, smallerSide;

			if (shapeProps.originalHeight < shapeProps.originalWidth) {
				smallerSide = shapeProps.originalHeight;
				cropX = (shapeProps.originalWidth - smallerSide) / 2;
			} else {
				smallerSide = shapeProps.originalWidth;
				cropY = (shapeProps.originalHeight - smallerSide) / 2;
			}

			const cropWidth = smallerSide;
			const cropHeight = smallerSide;

			cropParams = {
				cropX,
				cropY,
				cropWidth,
				cropHeight,
				width: 200,
				height: 200
			}
	  } else {
      const displayHeight = 200;
      const ratio = displayHeight / shapeProps.originalHeight;
      shapeProps.width = shapeProps.originalWidth * ratio;
      shapeProps.height = displayHeight;
    }

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
            relativeX: e.target.attrs.x - editorContext.params.drawableZone?.x,
            relativeY: e.target.attrs.y - editorContext.params.drawableZone?.y,
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          onChange({
            ...e.target.attrs,
            scaleX,
            scaleY,
	          rotation: node.attrs.rotation,
            width: Math.max(5, node.width()),
            height: Math.max(5, node.height()),
            relativeX: node.x() - editorContext.params.drawableZone?.x,
            relativeY: node.y() - editorContext.params.drawableZone?.y,
          });
        }}
        clipFunc={(ctx) => {
          // Begin path for clipping
          // Define the clipping region as a circle with radius equal to the width/height of the Group
          if (shapeProps.mask) {
            ctx.clip(new Path2D(shapeProps.mask));
          }
          ctx.rect(0, 0, shapeProps.width, shapeProps.height);
        }}
      >
        <Image
          width={shapeProps.width}
          height={shapeProps.height}
          {...cropParams}
          image={img}
        />
        {shapeProps.strokeWidth > 0 &&
          <Shape
            sceneFunc={(ctx, shape) => {
              ctx.beginPath()
              ctx.strokeStyle = shapeProps.stroke;
              ctx.lineWidth = shapeProps.strokeWidth;
              if (shapeProps.mask) {
                ctx.stroke(new Path2D(shapeProps.mask))
              } else {
                ctx.strokeRect(0, 0, shapeProps.width, shapeProps.height)
              }
              ctx.fillStrokeShape(shape)
            }}
          />
        }
      </Group>
    )
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Element;

