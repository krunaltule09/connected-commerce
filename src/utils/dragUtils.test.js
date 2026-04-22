import { createDocumentTileGhostImage, handleDocumentDragStart } from './dragUtils';

describe('createDocumentTileGhostImage', () => {
  let mockEvent;

  beforeEach(() => {
    mockEvent = {
      dataTransfer: {
        setDragImage: jest.fn(),
        setData: jest.fn(),
      },
    };
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('creates a ghost element and sets drag image', () => {
    const doc = { name: 'Test Doc' };
    const assets = { 'Banking_Capital_Market_Operate_Table_Vector_Icon.svg': '/icon.svg' };

    createDocumentTileGhostImage(doc, assets)(mockEvent);

    expect(mockEvent.dataTransfer.setDragImage).toHaveBeenCalled();
  });

  it('cleans up ghost element after timeout', () => {
    const doc = { name: 'Test Doc' };
    const assets = { 'Banking_Capital_Market_Operate_Table_Vector_Icon.svg': '/icon.svg' };
    const removeSpy = jest.spyOn(document.body, 'removeChild');

    createDocumentTileGhostImage(doc, assets)(mockEvent);
    jest.runAllTimers();

    expect(removeSpy).toHaveBeenCalled();
    removeSpy.mockRestore();
  });

  it('uses "Document" as default name when doc.name is empty', () => {
    const doc = {};
    createDocumentTileGhostImage(doc, {})(mockEvent);
    expect(mockEvent.dataTransfer.setDragImage).toHaveBeenCalled();
  });
});

describe('handleDocumentDragStart', () => {
  it('sets data transfer and creates ghost image', () => {
    const doc = { id: 42, name: 'Invoice' };
    const assets = { 'Banking_Capital_Market_Operate_Table_Vector_Icon.svg': '/icon.svg' };
    const event = {
      dataTransfer: {
        setData: jest.fn(),
        setDragImage: jest.fn(),
      },
    };

    jest.useFakeTimers();
    handleDocumentDragStart(doc, assets)(event);
    jest.runAllTimers();
    jest.useRealTimers();

    expect(event.dataTransfer.setData).toHaveBeenCalledWith('text/plain', '42');
    expect(event.dataTransfer.setDragImage).toHaveBeenCalled();
  });
});
