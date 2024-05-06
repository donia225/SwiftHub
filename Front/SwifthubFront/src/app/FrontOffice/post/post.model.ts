export interface Post {
    id: number;
    idUser: number;
    title: string;
    description: string;
    postDate: Date;
    attachment: Blob | File;
    comments: Comment[]; 
    visibility: number;

  }
  
  export interface Comment {
    id: number | null;
    postId: number;
    idUser: number;
    content: string;
    commentDate: Date;
    textColor: string;
    isBold: boolean; // Nouvelle propriété pour le style gras
  isItalic: boolean;
  isUnderline: boolean;
  isHighlighted: boolean;
  }
 