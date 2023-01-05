---
path: "/docs/managers/zos3270terminal-manager"
title: "Zos3270Terminal Manager"
---

This Manager is at Beta level. You can view the <a href="https://javadoc.galasa.dev/dev/galasa/zos3270/package-summary.html">Javadoc documentation for the Manager here</a>.<br>


[Overview](#overview)<br>
[Configuring](#configuring)<br>
[Provided annotation](#annotations)<br>
[Code snippets and examples](#codesnippets)<br>

# <a name="overview"></a>Overview

The zos3270Terminal Manager enables 3270 terminal interactions with back-end application programs and subsystems. The Manager also supports colour and highlight validation. For example, you can use the <code>retrieveColourAtCursor</code> method to check that the text colour in a specified field is as expected. You can check for the following colours: blue, red, pink, green, turquoise, yellow, neutral, and default. Use the <code>retrieveHighlightAtCursor</code> method to check that a field is highlighted as expected. 

Live terminal updates are displayed in Eclipse and terminal images are logged to enable swift diagnosis of failures. Use the <code>reportExtendedScreen</code> method to capture the colours in the log. The <code>ConfidentialText</code> method that is provided by the Core Manager enables confidential information such as passwords to be replaced with a numbered shield in these generated logs. 

Examples of using these methods are available in the [Code snippets and examples](#codesnippets) section.

You can view the <a href="https://javadoc.galasa.dev/dev/galasa/zos3270/package-summary.html">Javadoc documentation for this Manager here</a>. <br><br>

## <a name="dependencies"></a>Including the Manager in a test

To use the Zos3270Terminal Manager in a test you must import the _@Zos3270Terminal_ annotation into the test, as shown in the following example: 

```
@Zos3270Terminal(imageTag = "PRIMARY")
public ITerminal terminal;
```

If you want to use the colour and highlight features in a test you must import the following components into the test:

```
import dev.galasa.zos3270.spi.Colour;
import dev.galasa.zos3270.spi.Highlight;
```

You also need to add the Manager dependency into the pom.xml file if you are using Maven, or into the build.gradle file if you are using Gradle. 

If you are using Maven, add the following dependencies into the _pom.xml_ in the _dependencies_ section:

```
<dependency>
<groupId>dev.galasa</groupId>
<artifactId>dev.galasa.zos3270.manager</artifactId>
</dependency>
```

If you are using Gradle, add the following dependencies into ```build.gradle``` in the _dependencies_ closure:

```
dependencies {
compileOnly 'dev.galasa:dev.galasa.zos3270.manager'
}
```

# <a name="configuring"></a>Configuring 

The following properties are used to configure the Zos3270Terminal Manager:

## <a name="cps"></a>Configuration Properties

<details>
<summary>Apply Confidential Text Filtering to screen records CPS Property</summary>

| Property: | Apply Confidential Text Filtering to screen records CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | zos3270.apply.ctf |
| Description: | Logs and screen recordings are passed through the Confidential Text Filtering services, to hide text like passwords  |
| Required:  | No |
| Default value: | true |
| Valid values: | true, false |
| Examples: | <code>zos3270.apply.ctf=true<br></code> |

</details>

<details>
<summary>Extra bundles required to implement the CICS TS Manager CPS Property</summary>

| Property: | Extra bundles required to implement the CICS TS Manager CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | cicsts.extra.bundles |
| Description: | The symbolic names of any bundles that need to be loaded with the CICS TS Manager  |
| Required:  | No |
| Default value: |  dev.galasa.cicsts.ceci.manager,dev.galasa.cicsts.ceda.manager,dev.galasa.cicsts.cemt.manager |
| Valid values: | bundle-symbolic names in a comma separated list |
| Examples: | <code>cicsts.extra.bundles=org.example.cicsts.provisioning<br></code> |

</details>

<details>
<summary>URL to send live terminal updates for displaying in Eclipse</summary>

| Property: | URL to send live terminal updates for displaying in Eclipse CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | zos3270.live.terminal.images |
| Description: | Eclipse sets this property in the overrides so the terminal images are available to view in the Eclipse UI |
| Required:  | No |
| Default value: |  There is no default, an empty value means no live recording is done |
| Valid values: | A valid URL |
| Examples: | <code>zos3270.live.terminal.images=xxxxxxxx<br></code> |

</details>

<details>
<summary>Log terminal images to the console or runlog</summary>

| Property: | Log terminal images to the console or runlog CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | zos3270.console.terminal.images=xxxxxxxx |
| Description: | Enables terminal images to be logged to the console or runlog |
| Required:  | No |
| Default value: |  true |
| Valid values: | A valid address |
| Examples: | <code>zos3270.console.terminal.images=xxxxxxxx<br></code> |

</details>

<details>
<summary>Add custom 3270 device types with which to connect</summary>

| Property: | 3270 device types with which to connect CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | zos3270.image.xxxxxx.device.types |
| Description: | Allows for custom terminal device types |
| Required:  | No |
| Default value: | IBM-DYNAMIC,IBM-3278-2 |
| Valid values: | Valid 3270 device types in a comma separated list |
| Examples: | <code>zos3270.image.xxxxxx.device.types=IBM-DYNAMIC,IBM-3278-2<br></code> |

</details>


# <a name="annotations"></a>Annotations provided by the Manager

The following annotations are provided by the Zos3270Terminal Manager:

<details>
<summary>z/OS 3270 Terminal</summary>

| Annotation: | z/OS 3270 Terminal |
| --------------------------------------- | :------------------------------------- |
| Name: | @Zos3270Terminal |
| Description: | The <code>@Zos3270Terminal</code> annotation requests the z/OS 3270 Terminal Manager to provide a 3270 terminal associated with a z/OS image. |
| Attribute: `imageTag` |  The <code>imageTag</code> is used to identify the z/OS image. |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @Zos3270Terminal(imageTag="A")<br> public ITerminal zosTerminalA;<br></code> |
| Notes: | The <code>ITerminal</code> interface has a number of methods to issue commands to the 3270 client. See <a href="https://javadoc.galasa.dev/dev/galasa/zos3270/ITerminal.html" target="_blank">ITerminal</a> to find out more. |

</details>

# <a name="codesnippets"></a>Code snippets and examples

<details><summary>Check that the correct screen is displayed and available</summary>

The following example checks that the logon screen is displayed and that the field is available for input: 

```
terminal.waitForKeyboard().waitForTextInField("SIMPLATFORM LOGON SCREEN");
```
</details>

<details><summary>Log on to the system</summary>

The following example positions the cursor to the correct field and logs on to the system with User ID 'TESTER1' and password 'SYS1': 

```
terminal.positionCursorToFieldContaining("Userid").tab().type("TESTER1")
        .positionCursorToFieldContaining("Password").tab().type("SYS1").enter();
```
</details>

<details><summary>Select an application</summary>

The following example checks that the expected text "SIMBANK MAIN MENU" is displayed, positions the cursor to the correct field and selects the "BANKTEST" application : 

```
terminal.waitForKeyboard().waitForTextInField("SIMBANK MAIN MENU")positionCursorToFieldContaining("===>")
        .tab().type("BANKTEST").enter();
```
</details>

<details><summary>Check that value of a field is in the expected colour</summary>

The following example checks that the value in the customer number field is the colour turquoise and print out only the cursor and colours: 

```
terminal.positionCursorToFieldContaining("CUSTOMER NUMBER").cursorRight();
assertThat(terminal.retrieveColourAtCursor()).isEqualTo(Colour.TURQUOISE);
terminal.reportExtendedScreen(true, true, false, false, false, false, false);
```

where the _reportExtendedScreen_ parameters are: 
```
reportExtendedScreen(boolean printCursor, boolean printColour, boolean printHighlight, boolean printIntensity, boolean printProtected, boolean printNumeric, boolean printModified)
```
</details>


<details><summary>Check that value in a specified screen position is in the expected colour and send the colour output to the log</summary>

The following example checks that the text in a specified screen position is the colour blue and print all output to the logs: 

```
assertThat(terminal.retrieveColourAtPosition(5, 3)).isEqualTo(Colour.BLUE);
terminal.reportExtendedScreen(true, true, true, true, true, true, true);
```
where the _reportExtendedScreen_ parameters are: 
```
reportExtendedScreen(boolean printCursor, boolean printColour, boolean printHighlight, boolean printIntensity, boolean printProtected, boolean printNumeric, boolean printModified)
```
</details>


