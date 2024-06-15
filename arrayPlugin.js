const arrayPlugin = () => {
    return {
      name: "array-transform",
      transform(code, id) {
        if (!id.endsWith(".txt")) return;
        
        const path = id.split('?')[0];
        return `
        import source from '${path}?raw';
        const lines = source.replace(/\\r\\n|\\r/g, '\\n').split('\\n');
        export default lines;
        `;
      }
    };
  };
  export default arrayPlugin;