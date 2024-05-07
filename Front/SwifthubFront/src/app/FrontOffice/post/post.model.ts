export interface Post {
    id: number;
    idUser: string;
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
    idUser: string;
    content: string;
    commentDate: Date;
    textColor: string;
    isBold: boolean; // Nouvelle propriété pour le style gras
  isItalic: boolean;
  isUnderline: boolean;
  isHighlighted: boolean;
  }
 