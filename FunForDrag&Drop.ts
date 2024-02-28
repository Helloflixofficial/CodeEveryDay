const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(chapter);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);
  
    const updateChapter = items.slice(startIndex, endIndex + 1);
    setChapter(items);
    const bulkUpdatedData = updateChapter.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));
    onReorder(bulkUpdatedData);
  };
