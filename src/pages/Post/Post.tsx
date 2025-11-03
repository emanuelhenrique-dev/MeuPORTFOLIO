import { useNavigate } from 'react-router-dom';
import { HeadingContainer, PostContainer, PostContent } from './Post.styles';
import {
  ArrowSquareOutIcon,
  CalendarBlankIcon,
  CaretLeftIcon,
  ChatCircleDotsIcon,
  GithubLogoIcon
} from '@phosphor-icons/react';

export function Post() {
  const navigate = useNavigate();

  return (
    <PostContainer>
      <HeadingContainer>
        <div className="top-heading">
          <button onClick={() => navigate('/')}>
            <CaretLeftIcon size={16} color="#97edaa" weight="bold" />
            voltar
          </button>
          <a href="">
            ver no github
            <ArrowSquareOutIcon size={14} color="#97edaa" weight="bold" />
          </a>
        </div>
        <div className="post-info">
          <h2>JavaScript data types and data structures</h2>
          <div className="info">
            <span>
              <GithubLogoIcon size={20} color="#41704e" weight="bold" />{' '}
              cameronwll
            </span>
            <span>
              <CalendarBlankIcon size={20} color="#41704E" />
              Há 1 dia
            </span>
            <span>
              <ChatCircleDotsIcon size={20} color="#41704e" weight="fill" /> 5
              comentários
            </span>
          </div>
        </div>
      </HeadingContainer>
      <PostContent>
        <p>
          Programming languages all have built-in data structures, but these
          often differ from one language to another. This article attempts to
          list the built-in data structures available in JavaScript and what
          properties they have. These can be used to build other data
          structures. Wherever possible, comparisons with other languages are
          drawn. Dynamic typing JavaScript is a loosely typed and dynamic
          language. Variables in JavaScript are not directly associated with any
          particular value type, and any variable can be assigned (and
          re-assigned) values of all types:
        </p>
        <span>
          let foo = 42; // foo is now a number foo = ‘bar’; // foo is now a
          string foo = true; // foo is now a boolean
        </span>
      </PostContent>
    </PostContainer>
  );
}
