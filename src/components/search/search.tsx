/*
 * Copyright contributors to the Galasa project
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import React, { useRef, useState, useCallback, useMemo, forwardRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { useDocSearchKeyboardEvents } from "@docsearch/react"
import { Link, useStaticQuery, graphql, navigate } from "gatsby"

import SearchIcon from "../../images/search.inline.svg"
import { button } from "./search.module.scss"

let DocSearchModal = null;

function Hit({hit, children}) {
  return <Link to={hit.url}>{children}</Link>;
}

type DocSearchButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const DocSearchButton = forwardRef<HTMLButtonElement, DocSearchButtonProps>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label="Search"
        className={`${button}`}
        {...props}
      >
        <SearchIcon />
      </button>
    )
  }  
)

const ACTION_KEY_DEFAULT = 'Ctrl' as const;
const ACTION_KEY_APPLE = '⌘' as const;

function isAppleDevice() {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}

function ResultsFooter({state, onClose}) {
  const [key, setKey] = useState<typeof ACTION_KEY_APPLE | typeof ACTION_KEY_DEFAULT | null>(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setKey(isAppleDevice() ? ACTION_KEY_APPLE : ACTION_KEY_DEFAULT);
    }
  }, []);

  return (
    <p> You can trigger this search window with {
      <span className="DocSearch-Footer-Hint-Keys">
        <span className="DocSearch-Commands-Key">
          {key === ACTION_KEY_DEFAULT ? "Ctrl" : key}
        </span>
        <span className="DocSearch-Commands-Key">K</span>
      </span>
    } or {
      <span className="DocSearch-Footer-Hint-Keys">
        <span className="DocSearch-Commands-Key">/</span>
      </span>
    }
      </p>
  );
}

function DocSearch(props) {

  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | undefined>(undefined);

  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve();
    }

    return Promise.all([
      import("@docsearch/react/modal"),
      import("@docsearch/react/style"),
      import("./search.scss"),
    ]).then(([{DocSearchModal: Modal}]) => {
      DocSearchModal = Modal;
    });
  }, []);

  const onOpen = useCallback(() => {
    importDocSearchModalIfNeeded().then(() => {
      setIsOpen(true);
    });
  }, [importDocSearchModalIfNeeded, setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(
    (event: KeyboardEvent) => {
      importDocSearchModalIfNeeded().then(() => {
        setIsOpen(true);
        setInitialQuery(event.key);
      });
    },
    [importDocSearchModalIfNeeded, setIsOpen, setInitialQuery],
  );

  const navigator = useRef({
    navigate({ itemUrl }) {
      navigate(itemUrl)
    },
  }).current

  const transformItems = useRef((items) => {
    return items.map((item) => {
      // Make relative so works in test too
      const a = document.createElement('a');
      a.href = item.url;

      return {
        ...item,
        url: `${a.pathname}${a.hash}`,
      };
    });
  }).current;

  const resultsFooterComponent = useMemo(
    () => (footerProps) => <ResultsFooter {...footerProps} onClose={onClose} />,
    [onClose],
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <>
      <DocSearchButton
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={onOpen}
        ref={searchButtonRef}
      />

      {isOpen &&
        createPortal(
          <DocSearchModal
            onClose={onClose}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            resultsFooterComponent={resultsFooterComponent}
            {...props}
          />,
          document.body,
        )}
    </>
  );
}

function Search() {
  
  const {
    site: {
      siteMetadata: {
        consts: { algolia },
      },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          consts {
            algolia {
              appId
              apiKey
              indexName
            }
          }
        }
      }
    }
  `)

  const docSearchOpts = {
    placeholder: "Search Galasa",
    ...algolia
  }

  return <DocSearch {...docSearchOpts} />
}

export const SearchHead = ({ data: {site: {siteMetadata: { consts: {algolia}}}} }) => {
  return (
    <link rel="preconnect" href={`https://${algolia.appId.toLowerCase()}-dsn.algolia.net`} crossOrigin="anonymous" />
  );
}

export default Search;
