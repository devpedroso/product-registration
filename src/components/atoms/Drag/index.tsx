import { forwardRef, useContext } from 'react';
import { Upload, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { CameraOutlined } from '@ant-design/icons';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSwappingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { BreakpointContext } from 'src/contexts/BreakpointContext';

const Drag = forwardRef(function Drag(props: any, ref: any) {
  const {
    fileList = [],
    setFileList,
    photosToDelete,
    setPhotosToDelete,
  } = props;

  const { isMobile } = useContext(BreakpointContext);

  const beforeUpload = (file: RcFile) => {
    const isLt20M = file.size / 1024 / 1024 < 20;

    if (!isLt20M) {
      message.error('A imagem deve ser menor que 20MB!');
    }

    return isLt20M;
  };

  const handleRemoveImage = (file) => {
    setFileList(fileList.filter((image) => image.uid !== file.uid));

    const photoToDelete = fileList.find((image) => image?.id === file.id);

    if (photoToDelete?.id) {
      setPhotosToDelete([...photosToDelete, photoToDelete.id]);
    }
  };

  const handleChangeImage = (info) => {
    const { file, fileList } = info;

    if (file.status) {
      if (file.originFileObj) {
        const reader = new FileReader();

        resizeImageToBase64(file, 1600, 1600, function (resizedDataUrl) {
          file.url = resizedDataUrl;
        });

        reader.readAsDataURL(file.originFileObj);
        file.displayOrder = file.originFileObj.uid;
      }

      setFileList(fileList);
    }
  };

  const resizeImageToBase64 = (file, newWidth, newHeight, callback) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (event) {
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        const dataUrl = canvas.toDataURL('image/jpeg');
        callback(dataUrl);
      };

      img.src = event.target.result.toString();
    };

    reader.readAsDataURL(file.originFileObj);
  };

  const DraggableUploadListItem = ({ originNode, file }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: file.uid,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      cursor: 'move',
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={isDragging ? 'is-dragging' : ''}
        {...attributes}
        {...listeners}
      >
        {file.status === 'error' && isDragging
          ? originNode.props.children
          : originNode}
      </div>
    );
  };

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);

        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <>
      {isMobile ? (
        <Upload
          fileList={fileList}
          showUploadList={{ showPreviewIcon: null }}
          listType="picture-card"
          onRemove={handleRemoveImage}
          onChange={handleChangeImage}
          maxCount={5}
          multiple
          accept="image/png, image/jpeg"
          beforeUpload={beforeUpload}
        >
          <div>
            <CameraOutlined />
            <div
              style={{
                fontSize: 12,
                lineHeight: 1,
                width: '100%',
                borderRadius: 0,
              }}
            >
              Adicionar imagens
            </div>
          </div>
        </Upload>
      ) : (
        <div>
          <input
            ref={ref}
            style={{ height: 0, border: 'none', position: 'absolute' }}
          />
          <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext
              items={fileList?.map((i) => i.uid)}
              strategy={rectSwappingStrategy}
            >
              <Upload
                fileList={fileList}
                listType="picture-card"
                itemRender={(originNode, file) => (
                  <DraggableUploadListItem
                    originNode={originNode}
                    file={file}
                  />
                )}
                maxCount={5}
                multiple
                accept="image/png, image/jpeg"
                onChange={handleChangeImage}
                onRemove={handleRemoveImage}
                beforeUpload={beforeUpload}
              >
                <div>
                  <CameraOutlined />
                  <div
                    style={{
                      fontSize: 12,
                      lineHeight: 1,
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    Adicionar imagens
                  </div>
                </div>
              </Upload>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </>
  );
});

export default Drag;
