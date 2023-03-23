import Node from "./node";

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const rootNode = new Node(arr[mid]);

    rootNode.left = this.buildTree(arr.slice(0, mid));
    rootNode.right = this.buildTree(arr.slice(mid + 1));

    return rootNode;
  }

  insert(treeRoot, value) {
    if (!treeRoot) {
      treeRoot = new Node(value);
      return treeRoot;
    }

    if (value < treeRoot.data) {
      treeRoot.left = this.insert(treeRoot.left, value);
    } else if (value > treeRoot.data) {
      treeRoot.right = this.insert(treeRoot.right, value);
    }

    return treeRoot;
  }

  delete(treeRoot, value) {
    if (!treeRoot) {
      return treeRoot;
    }

    if (value < treeRoot.data) {
      treeRoot.left = this.delete(treeRoot.left, value);
    } else if (value > treeRoot.data) {
      treeRoot.right = this.delete(treeRoot.right, value);
    } else {
      if (!treeRoot.left) {
        return treeRoot.right;
      } else if (!treeRoot.right) {
        return treeRoot.left;
      }

      let currentRoot = treeRoot.right;
      let inorderSuccessor = currentRoot.data;
      while (currentRoot.left) {
        inorderSuccessor = currentRoot.left.data;
        currentRoot = currentRoot.left;
      }

      treeRoot.data = inorderSuccessor;
      treeRoot.right = this.delete(treeRoot.right, inorderSuccessor);
    }

    return treeRoot;
  }
}

export default Tree;
