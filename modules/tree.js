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
      treeRoot.right = this.delete(inorderSuccessor, treeRoot.right);
    }

    return treeRoot;
  }

  find(value, root = this.root) {
    if (!root) return;

    if (value === root.data) return root;

    if (value < root.data) {
      return this.find(value, root.left);
    } else {
      return this.find(value, root.right);
    }
  }

  levelOrder(cb, root = this.root, queue = [this.root], arr = []) {
    if (!root) return;

    if (root.left) queue.push(root.left);
    if (root.right) queue.push(root.right);

    cb ? cb(root) : arr.push(root.data);
    queue.shift();
    this.levelOrder(cb, queue.length && queue[0], queue, arr);

    if (!cb) {
      return arr;
    }
  }

  preorder(cb, root = this.root, arr = []) {
    if (!root) return;

    cb ? cb(root) : arr.push(root.data);
    this.preorder(cb, root.left, arr);
    this.preorder(cb, root.right, arr);

    if (!cb) {
      return arr;
    }
  }

  inorder(cb, root = this.root, arr = []) {
    if (!root) return;

    this.inorder(cb, root.left, arr);
    cb ? cb(root) : arr.push(root.data);
    this.inorder(cb, root.right, arr);

    if (!cb) {
      return arr;
    }
  }

  postorder(cb, root = this.root, arr = []) {
    if (!root) {
      return;
    }

    this.postorder(cb, root.left, arr);
    this.postorder(cb, root.right, arr);
    cb ? cb(root) : arr.push(root.data);

    if (!cb) {
      return arr;
    }
  }

  height(selectedNodeData) {
    const root = this.find(selectedNodeData);

    if (!root) {
      return -1;
    } else {
      const left = this.height(root.left?.data);
      const right = this.height(root.right?.data);

      return Math.max(left, right) + 1;
    }
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

  rebalance() {
    if (this.root) {
      if (!this.isBalanced()) {
        const nodesArr = this.inorder();

        this.root = this.buildTree(nodesArr);
      }
    } else {
      throw new Error("There is no node in the tree!");
    }
  }
}

export default Tree;
