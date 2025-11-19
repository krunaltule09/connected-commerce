/**
 * Utility functions for drag and drop operations
 */

/**
 * Creates a custom ghost image for document tiles during drag operations
 * @param {Object} doc - The document object being dragged
 * @returns {Function} - A function that sets up the ghost image when called with a drag event
 */
export const createDocumentTileGhostImage = (doc) => (e) => {
  // Create a ghost image that looks like the tile
  const ghostElement = document.createElement('div');
  ghostElement.style.width = '150px';
  ghostElement.style.height = '156px';
  ghostElement.style.background = '#35343E';
  ghostElement.style.borderRadius = '20px';
  ghostElement.style.display = 'flex';
  ghostElement.style.flexDirection = 'column';
  ghostElement.style.padding = '12px';
  ghostElement.style.boxSizing = 'border-box';
  ghostElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
  
  // Create the document preview area (gray box)
  const previewArea = document.createElement('div');
  previewArea.style.width = '100%';
  previewArea.style.height = '100px';
  previewArea.style.background = '#E6E6E9';
  previewArea.style.borderRadius = '12px';
  previewArea.style.display = 'flex';
  previewArea.style.alignItems = 'center';
  previewArea.style.justifyContent = 'center';
  previewArea.style.marginBottom = '10px';
  
  // Add the same document icon as in the tile
  const iconImg = document.createElement('img');
  iconImg.src = `${process.env.PUBLIC_URL}/assets/Vector.svg`;
  iconImg.style.width = '31px';
  iconImg.style.height = '31px';
  previewArea.appendChild(iconImg);
  
  // Create the document name area
  const nameArea = document.createElement('div');
  nameArea.style.color = '#FCFCFC';
  nameArea.style.fontSize = '14px';
  nameArea.style.fontWeight = '400';
  nameArea.style.whiteSpace = 'nowrap';
  nameArea.style.overflow = 'hidden';
  nameArea.style.textOverflow = 'ellipsis';
  nameArea.style.padding = '0 4px';
  nameArea.textContent = doc.name || 'Document';
  
  // Assemble the ghost element
  ghostElement.appendChild(previewArea);
  ghostElement.appendChild(nameArea);
  
  document.body.appendChild(ghostElement);
  e.dataTransfer.setDragImage(ghostElement, 75, 75);
  
  // Clean up the ghost element after it's been used
  setTimeout(() => {
    document.body.removeChild(ghostElement);
  }, 0);
};

/**
 * Sets up drag data for a document
 * @param {Object} doc - The document object being dragged
 * @returns {Function} - Event handler for drag start
 */
export const handleDocumentDragStart = (doc) => (e) => {
  // Set the document ID as the drag data
  e.dataTransfer.setData('text/plain', String(doc.id));
  
  // Apply the custom ghost image
  createDocumentTileGhostImage(doc)(e);
};
