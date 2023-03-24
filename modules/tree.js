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

  insert(value, treeRoot = this.root) {
    if (!treeRoot) {
      treeRoot = new Node(value);
      return treeRoot;
    }

    if (value < treeRoot.data) {
      treeRoot.left = this.insert(value, treeRoot.left);
    } else if (value > treeRoot.data) {
      treeRoot.right = this.insert(value, treeRoot.right);
    }

    return treeRoot;
  }

  delete(value, treeRoot = this.root) {
    if (!treeRoot) {
      return treeRoot;
    }

    if (value < treeRoot.data) {
      treeRoot.left = this.delete(value, treeRoot.left);
    } else if (value > treeRoot.data) {
      treeRoot.right = this.delete(value, treeRoot.right);
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

  find(value) {
    if (this.root) {
      let currentRoot = { ...this.root };

      while (currentRoot) {
        if (value < currentRoot.data) {
          currentRoot = currentRoot.left;
        } else if (value > currentRoot.data) {
          currentRoot = currentRoot.right;
        } else if (value === currentRoot.data) {
          return currentRoot;
        }
      }
    }
  }

  levelOrder(cb) {
    if (this.root) {
      let currentRoot = { ...this.root };
      const queue = [];
      const ifCbNotProvided = [];

      while (currentRoot) {
        if (currentRoot.left) queue.push(currentRoot.left);
        if (currentRoot.right) queue.push(currentRoot.right);

        cb ? cb(currentRoot) : ifCbNotProvided.push(currentRoot.data);
        currentRoot = queue[0];
        queue.shift();
      }

      if (!cb) {
        return ifCbNotProvided;
      }
    } else {
      throw new Error("There is no node in the tree!");
    }
  }

  preorder(root, cb, arr = []) {
    if (!root) return;

    cb ? cb(root) : arr.push(root.data);
    this.preorder(root.left, cb, arr);
    this.preorder(root.right, cb, arr);

    if (!cb) {
      return arr;
    }
  }

  inorder(root, cb, arr = []) {
    if (!root) return;

    this.inorder(root.left, cb, arr);
    cb ? cb(root) : arr.push(root.data);
    this.inorder(root.right, cb, arr);

    if (!cb) {
      return arr;
    }
  }

  postorder(root, cb, arr = []) {
    if (!root) {
      return;
    }

    this.postorder(root.left, cb, arr);
    this.postorder(root.right, cb, arr);
    cb ? cb(root) : arr.push(root.data);

    if (!cb) {
      return arr;
    }
  }

  height(selectedNodeData, root = this.find(selectedNodeData)) {
    if (!root) return -1;

    const left = this.height(selectedNodeData, root.left);
    const right = this.height(selectedNodeData, root.right);

    return Math.max(left, right) + 1;
  }

  depth(selectedNodeData, root = this.root) {
    if (!root) return -1;

    let nodeDepth = -1;

    if (
      root.data === selectedNodeData ||
      (nodeDepth = this.depth(selectedNodeData, root.left)) >= 0 ||
      (nodeDepth = this.depth(selectedNodeData, root.right)) >= 0
    ) {
      nodeDepth++;
    }

    return nodeDepth;
  }

  isBalanced() {
    if (this.root) {
      const leftHeight = this.height(this.root.left?.data);
      const rightHeight = this.height(this.root.right?.data);

      return Math.abs(leftHeight - rightHeight) <= 1;
    } else {
      throw new Error("There is no node in the tree!");
    }
  }
}

export default Tree;
